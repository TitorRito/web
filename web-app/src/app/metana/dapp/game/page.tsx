import Gamify from '@/components/w3/Gamify';

export default function GamePage() {

    return (
        <div className="w-full  mx-auto my-8 flex flex-col items-center justify-center gap-4 [&>*]:border [&>*]:border-gray-700 [&>*]:rounded-lg [&>*]:p-4 [&>*]:w-full [&>*]:max-w-2xl">
            <div>
                <div>this is a game interaction between</div>
                <ul>
                    <li>the user: wallet</li>
                    <li>the contract ERC1155 - now on hardhat - later on sepoli</li>
                    <li>the game - under gamify component </li>
                </ul>
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-2">Game Interface</h2>
                <Gamify />
            </div>
        </div>
    );
}