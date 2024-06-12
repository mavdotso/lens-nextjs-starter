import { useBuildResourceSrc } from '@/hooks/useBuildResourceSrc';
import { NftImage, ProfilePictureSet } from '@lens-protocol/react-web';
import { AvatarFallback } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

type RemoteProfilePictureProps = {
    picture: ProfilePictureSet;
};

function RemoteProfilePicture({ picture }: RemoteProfilePictureProps) {
    const url = picture.optimized?.uri || picture.raw.uri;
    const src = useBuildResourceSrc(url);
    if (!src) return null;
    return <AvatarImage src={src}></AvatarImage>;
}

type ProfilePictureProps = {
    picture: ProfilePictureSet | NftImage;
};

export function ProfilePicture({ picture }: ProfilePictureProps) {
    switch (picture.__typename) {
        case 'ImageSet':
            return <RemoteProfilePicture picture={picture} />;
        default:
            return <AvatarFallback>CN</AvatarFallback>;
    }
}
