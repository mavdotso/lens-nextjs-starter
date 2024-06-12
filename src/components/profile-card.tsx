import { Profile, ProfileStats } from '@lens-protocol/react-web';
import { ProfilePicture } from './profile-picture';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

type ProfileCardProps = {
    profile: Profile;
};

function ProfileTickers({ stats }: { stats: ProfileStats }) {
    return (
        <p
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2rem',
                justifyContent: 'space-between',
            }}
        >
            <span>
                Followers:&nbsp;<strong>{stats.followers}</strong>
            </span>
            <span>
                Following:&nbsp;<strong>{stats.following}</strong>
            </span>
            <span>
                Collects:&nbsp;<strong>{stats.collects}</strong>
            </span>
        </p>
    );
}

export function ProfileCard({ profile }: ProfileCardProps) {
    const { metadata } = profile;

    return (
        <Card className="max-w-md">
            <CardHeader>
                {metadata && (
                    <div className="flex gap-4">
                        <Avatar className="w-16 h-16">{metadata.picture ? <ProfilePicture picture={metadata.picture} /> : <AvatarFallback>{metadata.displayName?.slice(0.2)}</AvatarFallback>}</Avatar>
                        <div>
                            <CardTitle>{metadata.displayName}</CardTitle>
                            <CardDescription>{metadata.bio}</CardDescription>
                        </div>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <ProfileTickers stats={profile.stats} />
            </CardContent>
        </Card>
    );
}
