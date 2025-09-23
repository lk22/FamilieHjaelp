// Layouts
import ProfileParentsOverviewLayout from "@/layouts/profile/profile-parents-layout";

// Components
import ChildsList from "@/components/Profile/Home/Parents/ChildList";

export default function ProfileParentsChildren() {
    return (
        <>
            <ProfileParentsOverviewLayout title="Parents Overview" headline={
                <>
                    <h1>Børne oversigt</h1>
                    <h2 className="text-xl mt-4 text-black">Se oversigten over dine børn</h2>
                </>
            }>
                <ChildsList />
            </ProfileParentsOverviewLayout>
        </>
    );
}