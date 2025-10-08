import {useIsMobile} from '@/hooks/use-mobile';
import {useIsTablet} from '@/hooks/use-tablet';

const MOBILE_SLIDES_PER_VIEW = 1;
const TABLET_SLIDES_PER_VIEW = 1;
const DESKTOP_SLIDES_PER_VIEW = 2;

export function HandleSwiperSlidesPerView(): number {
    const isMobile = useIsMobile();
    const isTablet = useIsTablet();

    const getSlidesPerView = (): number => {
        if (isMobile) {
            return MOBILE_SLIDES_PER_VIEW;
        }

        if (isTablet) {
            return TABLET_SLIDES_PER_VIEW;
        }

        return DESKTOP_SLIDES_PER_VIEW;
    };

    return getSlidesPerView();
}