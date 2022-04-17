// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import ContractABI from '../artifacts/contracts/Greeter.sol/Greeter.json';

/**
 *
 */
 const OWNER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

/**
 *
 * @returns
 */
 const setupContract = async (ContractName: string) => {
  const Contract = await ethers.getContractFactory(ContractName);
  const contract = await Contract.deploy('Default Message');
  await contract.deployed();

  console.log("Contract deployed to:", contract.address)

  return contract;
};

/**
 *
 * @param walletAddress
 */
const setupProvider = async (walletAddress: string) => {
  const provider = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner(walletAddress);
  return signer;
};

/**
 *
 * @param contractAddres
 * @param walletAddress
 * @returns
 */
const setupContactProvider = async (
  contractAddres: string,
  walletAddress: string
) => {
  const signer = await setupProvider(walletAddress);
  const contract = new ethers.Contract(contractAddres, ContractABI.abi, signer);
  return contract;
};

const main = async () => {
  const deployed = await (await setupContract('Greeter')).deployed();
  const contract = await setupContactProvider(
    deployed.address,
    OWNER_ADDRESS
  );

  await contract.setGreeting('My Random Greet Message');

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // // We get the contract to deploy
  // const Contract = await ethers.getContractFactory("Greeter");
  // const contract = await Contract.deploy("Hello, Hardhat!");

  // await contract.deployed();

  // console.log("Contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
