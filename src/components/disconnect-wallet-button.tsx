import { useAccount, useDisconnect } from 'wagmi';
import { Button } from './ui/button';

export function DisconnectWalletButton() {
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        disconnect();
    };

    if (!isConnected) {
        return <Button variant={'ghost'}>Disconnect</Button>;
    }

    return (
        <Button variant={'secondary'} onClick={handleClick}>
            Disconnect
        </Button>
    );
}
