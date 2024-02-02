import { Separator } from "@/components/ui/separator";
import { getMyPermissions } from "@/requests/me";
import { PermissionGroup } from "../enums";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { findPermissionKey, getPermissionValues } from "@/lib/utils";
import PermissionCard, { PermissionCardProps } from "./_components/permissionCard";


const MyPage = async () => {
    const myPermissions = await getMyPermissions();

    if (!myPermissions) return (
        <div>
            Du har ingen rettigheter.
        </div>
    )

    const permissionList = Object.entries(myPermissions.permissions).map(([key, value]) => ({ [key]: value}));

    const permissionApps: PermissionCardProps[] = [
        {
          app: PermissionGroup.PAYMENT,
          key: "order",
          title: "Betalinger",
          description: "Administrer betalinger.",
        },
        {
          app: PermissionGroup.EVENT,
          key: "event",
          title: "Arrangementer",
          description: "Administrer arrangementer.",
        },
        {
          app: PermissionGroup.NEWS,
          key: "news",
          title: "Nyheter",
          description: "Administrer nyheter.",
        },
        {
          app: PermissionGroup.JOBPOST,
          key: "jobpost",
          title: "Jobbannonser",
          description: "Administrer jobbannonser.",
        },
        {
          app: PermissionGroup.GROUP,
          key: "group",
          title: "Grupper",
          description: "Administrer grupper.",
        },
        {
          app: PermissionGroup.BANNER,
          key: "banner",
          title: "Bannere",
          description: "Administrer bannere.",
        },
        {
          app: PermissionGroup.STRIKE,
          key: "strike",
          title: "Prikker",
          description: "Administrer prikker.",
        },
        {
          app: PermissionGroup.USER,
          key: "user",
          title: "Brukere",
          description: "Administrer brukere.",
        }
    ];

    return (
        <div className="py-20 px-4 md:px-12">
            <div className="space-y-2">
                <h1 className="text-xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
                    Mine rettigheter
                </h1>
                <p className="text-sm md:text-lg text-muted-foreground">
                    Her kan du se en oversikt over dine rettigheter.
                </p>
            </div>

            <Separator className="my-8" />

            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8">
                { permissionApps.map((app, index) => (
                    <PermissionCard key={index} permission={app} />
                )) }
            </div>
        </div>
    );
};


export default MyPage;