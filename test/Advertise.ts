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

    const Advertise = await ethers.getContractFactory("Advertise");
    const advertise = await Advertise.deploy(5, 100, 7);

    return { advertise, owner, alice, bob };
  }

  describe("Deployment", function () {
    it("Should deploy", async function () {
      const { advertise, owner, alice, bob } = await loadFixture(deployFixture);
      expect(await advertise.getAddress()).to.be.not.null;
    });

    // it("Should set the right owner", async function () {
    //   const { advertisableCoin: lock, owner } = await loadFixture(deployFixture);

    //   expect(await lock.owner()).to.equal(owner.address);
    // });

    // it("Should receive and store the funds to lock", async function () {
    //   const { advertisableCoin: lock, lockedAmount } = await loadFixture(
    //     deployFixture
    //   );

    //   expect(await ethers.provider.getBalance(lock.target)).to.equal(
    //     lockedAmount
    //   );
    // });

    // it("Should fail if the unlockTime is not in the future", async function () {
    //   // We don't use the fixture here because we want a different deployment
    //   const latestTime = await time.latest();
    //   const Lock = await ethers.getContractFactory("Lock");
    //   await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
    //     "Unlock time should be in the future"
    //   );
    // });
  });

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
