import { SessionType, useSession } from '@lens-protocol/react-web';
import { useAccount } from 'wagmi';
import { ConnectWalletButton } from './connect-wallet-button';
import { truncateEthAddress } from '@/lib/utils';
import { DisconnectWalletButton } from './disconnect-wallet-button';
import { LogoutButton } from './logout-button';
import { LoginOptions } from './login-options';
import { ProfileCard } from './profile-card';

export function WelcomeToLens() {
    const { isConnected, address } = useAccount();
    const { data: session } = useSession();

    if (!isConnected) {
        return (
            <>
                <p className="mb-4 text-gray-500">Connect your wallet to get started.</p>
                <ConnectWalletButton />
            </>
        );
    }

    if (!session?.authenticated && address) {
        return (
            <>
                <p className="mb-4 text-gray-500">Connected wallet: {truncateEthAddress(address)}</p>
                <LoginOptions wallet={address} />
                <div className="mt-2">
                    <DisconnectWalletButton />
                </div>
            </>
        );
    }

    if (session && session.type === SessionType.WithProfile) {
        return (
            <div className="flex flex-col gap-4">
                <ProfileCard profile={session.profile} />
                <LogoutButton />
            </div>
        );
    }

    // you can handle other session types here
    return null;
}
