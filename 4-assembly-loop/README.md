# assembly-loop

Following the steps to complete this exercise:
1. clone this project
* **Option 1**
```bash
git clone https://github.com/GeorgeBrownCollege-Toronto/Advanced-Smart-Contracts.git ./assembly-loop && \
cd ./assembly-loop && \
git filter-branch --prune-empty --subdirectory-filter ./notes/solidity-assembly/lab/assembly-loop HEAD && \
rm -rf ./.git
```
^^^ Stack Overflow : [https://stackoverflow.com/a/11835214](https://stackoverflow.com/a/11835214)
* **Option 2**
```
mkdir assembly-loop && \
cd ./assembly-loop && \ 
git init && \ 
git remote add origin -f https://github.com/GeorgeBrownCollege-Toronto/Advanced-Smart-Contracts.git && \
git sparse-checkout init && \
git sparse-checkout set notes/solidity-assembly/lab/assembly-loop && \
git pull origin master && \ 
mv notes/solidity-assembly/lab/assembly-loop/* . && \
rm -rf ./.git ./notes
```

2. install packages: `yarn`
3. run the test: `yarn test`
4. the test should fail the gas test
5. fix the failed test case by updating the `BitWise.sol` contract
   - replace the logic in the `countBitSetAsm()` with inline assembly logic
6. add a test case to verify the result for `countBitSetAsm(0)`
7. Zip the project and submit on black board. Do not zip with `node_modules`, you'll receive 0. (but you can re-submit)
