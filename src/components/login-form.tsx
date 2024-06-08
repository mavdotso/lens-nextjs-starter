import { profileId, useLogin, useProfilesManaged, Profile } from '@lens-protocol/react-web';
import { Loading } from './loading';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export type LoginAsProps = {
    profile: Profile;
    wallet: string;
    onSuccess: (profile: Profile) => void;
};

export function LoginForm({ profile, wallet, onSuccess }: LoginAsProps) {
    const { execute, loading: isLoginPending } = useLogin();
    const { data: profiles, error, loading } = useProfilesManaged({ for: wallet, includeOwned: true });

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const id = profileId(formData.get('id') as string);

        const result = await execute({
            address: wallet,
            profileId: id,
        });

        if (result.isSuccess()) {
            console.log(result);
            toast.success(`Welcome ${String(result.value?.handle?.fullHandle ?? result.value?.id)}`);
            return onSuccess(profile);
        }

        toast.error(result.error.message);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        toast.error(`Error: ${error}`);
    }

    if (!profiles || profiles.length === 0) {
        return <p className="mb-4 text-base text-gray-500">No Lens Profiles found in this wallet.</p>;
    }

    return (
        <form onSubmit={onSubmit} className="flex">
            <fieldset className="flex place-items-center flex-col">
                <legend className="text-base text-gray-500">Select a Lens Profile to login with.</legend>
                <div className="my-4 space-y-2">
                    <RadioGroup>
                        {profiles &&
                            profiles.map((profile, idx) => (
                                <div
                                    key={profile.id}
                                    className="w-full items-center p-4 rounded-lg cursor-pointer border transition-colors border-gray-300 hover:border-gray-500 grid grid-cols-[24px_auto]"
                                >
                                    <RadioGroupItem disabled={isLoginPending} defaultChecked={idx === 0} value={profile.id} />
                                    <span className="text-gray-800 text-sm font-semibold">{profile.handle?.fullHandle ?? profile.id}</span>
                                </div>
                            ))}
                    </RadioGroup>
                </div>

                <div>
                    <Button disabled={isLoginPending} type="submit">
                        {isLoginPending ? 'Sign message in your wallet' : 'Login to Lens'}
                    </Button>
                </div>
            </fieldset>
        </form>
    );
}
