const ProxyDelegateAlternative = artifacts.require('ProxyDelegateAlternative');
const SomeLibrary = artifacts.require('SomeLibrary');
const truffleAssert = require('truffle-assertions');
const ethers = require('ethers');
const utils = ethers.utils;

contract("ProxyDelegateAlternative", accounts => {
    let proxy;
    let lib;
    const coder = new ethers.utils.AbiCoder();
    const owner = accounts[0];
    before(async () => {
        lib = await SomeLibrary.deployed();
        proxy = await ProxyDelegateAlternative.deployed(lib.address, { from: owner });
    });

    it("get owner should pass", () => {
        return proxy.owner().then(result => {
            assert.equal(result, owner, "owner not match");
        })
    });

    it("getMsgSender by call should result in LogResult event with ProxyDelegateAlternative address", () => {
        const data = utils.id("getMsgSender()").slice(0, 10);
        return proxy.sendTransaction({ from: accounts[1], data })
            .then(tx => {
                truffleAssert.eventEmitted(tx, 'LogResult', (ev) => {
                    const regex = new RegExp(proxy.address.slice(2), 'i')
                    return regex.test(ev.result);
                });
            });
    });

    it("setVersion by call should update version in the SomeLibrary", async () => {
        const expectedVersion = 3;
        const selector = utils.id("setVersion(uint256)").slice(0, 10);
        const versionData = coder.encode(["uint256"], [expectedVersion]);
        const data = utils.hexlify(utils.concat([selector, versionData]));
        await proxy.sendTransaction({ from: accounts[1], data });

        // owner shouldn't change
        const ownerResult = await proxy.owner();
        assert.equal(ownerResult, owner, "owner changed!")

        // SomeLibrary version should update when .call is used.
        const libVersion = await lib.version();
        assert.equal(libVersion, expectedVersion, "version mismatch");
    });
});
