const BitWise = artifacts.require('BitWise');
const { BN } = require('@openzeppelin/test-helpers');
const BigNumber = require('bn.js');
const chaiBN = require('chai-bn')(BN);
require('chai').use(chaiBN);
const { expect } = require('chai');

contract("BitWise", () => {
    let bitwise;
    before(() => {
        return BitWise.deployed().then(instance => {
            bitwise = instance;
        })
    });

    it('countBitSetAsm() should be more gas efficient than countBitSet()', async () => {
        const myNumber = 250;
        const gas = await bitwise.countBitSet.estimateGas(myNumber);
        const gasAsm = await bitwise.countBitSetAsm.estimateGas(myNumber);
        expect(gas).to.be.gt(gasAsm, "Assembly should be more gas efficient");
    });

    describe('#countBitSet', () => {
        it('should return 0 for input = 0', async () => {
            const myNumber = 0;
            const resultAsm = await bitwise.countBitSet(myNumber);
            expect(resultAsm).to.be.a.bignumber.that.equal(new BigNumber(0), "result should match");
        });

        it('should return 6 for input = 250', async () => {
            const myNumber = 250;
            const resultAsm = await bitwise.countBitSet(myNumber);
            expect(resultAsm).to.be.a.bignumber.that.equal(new BigNumber(6), "result should match");
        });
    });

    describe('#countBitSetAsm', () => {
        it('should return 0 for input = 0', async () => {
            const myNumber = 0;
            const resultAsm = await bitwise.countBitSetAsm(myNumber);
            expect(resultAsm).to.be.a.bignumber.that.equal(new BigNumber(0), "result should match");
        });

        it('should return 6 for input = 250', async () => {
            const myNumber = 250;
            const resultAsm = await bitwise.countBitSetAsm(myNumber);
            expect(resultAsm).to.be.a.bignumber.that.equal(new BigNumber(6), "result should match");
        });
    });
});
