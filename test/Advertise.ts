import {
  loadFixture
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Advertise", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, alice, bob] = await ethers.getSigners();
    const initialBudget = 100
    const initialCampaignPeriod = 7 * 24 * 60 * 60 * 1000

    const Advertise = await ethers.getContractFactory("Advertise");
    const advertise = await Advertise.deploy(5, initialBudget, initialCampaignPeriod);

    return { advertise, owner, alice, bob, initialBudget, initialCampaignPeriod };
  }

  describe("Deployment", function () {
    it("Should deploy", async function () {
      const { advertise, owner, alice, bob, initialBudget, initialCampaignPeriod } = await loadFixture(deployFixture);
      expect(await advertise.getAddress()).to.be.not.null;
    });

    it("should increase budget", async function () {
      const { advertise, owner, alice, bob, initialBudget, initialCampaignPeriod } = await loadFixture(deployFixture);
      await advertise.increaseBudget(5)

      expect(await advertise.budget()).to.be.equal(initialBudget + 5)
    })

    it("should decrease budget", async function () {
      const { advertise, owner, alice, bob, initialBudget, initialCampaignPeriod } = await loadFixture(deployFixture);
      await advertise.decreaseBudget(2)

      expect(await advertise.budget()).to.be.equal(initialBudget - 2)
    })

    it("should increase campaign period", async function () {
      const { advertise, owner, alice, bob, initialBudget, initialCampaignPeriod } = await loadFixture(deployFixture);
      await advertise.increaseCampaignPeriod(1)

      expect(await advertise.campaignPeriod()).to.be.equal(52254720086400)
    })

    it("should decrease campaign period", async function () {
      const { advertise, owner, alice, bob, initialBudget, initialCampaignPeriod } = await loadFixture(deployFixture);
      await advertise.decreaseCampaignPeriod(1)

      expect(await advertise.campaignPeriod()).to.be.equal(52254719913600)
    })

    it("should toggle campaign", async function () {
      const { advertise, owner, alice, bob, initialBudget, initialCampaignPeriod } = await loadFixture(deployFixture);
      await advertise.toggleCampaign();

      expect(await advertise.status()).to.be.equal(false)
    })

    it("should change default reward fee", async function () {
      const { advertise, owner, alice, bob, initialBudget, initialCampaignPeriod } = await loadFixture(deployFixture);
      await advertise.changeDefaultFee(20);

      expect(await advertise.reward()).to.be.equal(20)
    })
  });


  describe("Campaign Management", function () {
    it("Should increase budget", async function () {
      const { advertise, owner } = await loadFixture(deployFixture);
      await advertise.increaseBudget(50);
      expect(await advertise.budget()).to.equal(150);
    });

    it("Should decrease budget", async function () {
      const { advertise, owner } = await loadFixture(deployFixture);
      await advertise.decreaseBudget(50);
      expect(await advertise.budget()).to.equal(50);
    });

    it("Should increase campaign period", async function () {
      const { advertise, owner } = await loadFixture(deployFixture);
      await advertise.increaseCampaignPeriod(3);
      expect(await advertise.campaignPeriod()).to.equal(10 * 24 * 60 * 60); // 10 days in seconds
    });

    it("Should decrease campaign period", async function () {
      const { advertise, owner } = await loadFixture(deployFixture);
      await advertise.decreaseCampaignPeriod(3);
      expect(await advertise.campaignPeriod()).to.equal(4 * 24 * 60 * 60); // 4 days in seconds
    });

    it("Should toggle campaign status", async function () {
      const { advertise, owner } = await loadFixture(deployFixture);
      await advertise.toggleCampaign();
      expect(await advertise.status()).to.equal(false);
    });

    it("Should change default fee", async function () {
      const { advertise, owner } = await loadFixture(deployFixture);
      await advertise.changeDefaultFee(10);
      expect(await advertise.reward()).to.equal(10);
    });
  });

  // describe("Referral System", function () {
  //   it("Should reward referrer and deduct from budget", async function () {
  //     const { advertise, alice, bob } = await loadFixture(deployFixture);
  //     await advertise.connect(alice).claim(bob.address); // Assuming alice refers bob
  //     expect(await advertise.referrerRewards(bob.address)).to.equal(5);
  //     expect(await advertise.budget()).to.equal(95);
  //   });
  // });

  // describe("Advertising features", function () {
  //   describe("Rewards", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { advertisableCoin: lock } = await loadFixture(deployFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { advertisableCoin: lock, unlockTime, otherAccount } = await loadFixture(
  //         deployFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { advertisableCoin: lock, unlockTime } = await loadFixture(
  //         deployFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Claims", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { advertisableCoin: lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });
  // });
});
