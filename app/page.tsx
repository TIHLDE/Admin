import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getMyPermissions } from "@/requests/me";
import { PermissionGroup } from "./enums";
import { CalendarClockIcon, CreditCardIcon, FlagIcon, GripHorizontalIcon, NewspaperIcon, UserIcon, UsersIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";


const Home = async () => {
  const myPermissions = await getMyPermissions();

  if (!myPermissions) return (
    <div>
      Du har ingen rettigheter.
    </div>
  )
  
  const permissionGroups = Object
    .entries(myPermissions.permissions)
    .filter(([key, value]) => value.write === true || value.write_all === true)
    .map(([key, value]) => key);
  
  const iconStyle = "absolute top-2 right-2";

  const permissionApps = [
    {
      app: PermissionGroup.PAYMENT,
      icon: <CreditCardIcon className={iconStyle} />,
      title: 'Betalinger',
      description: 'Administrer betalinger.',
      href: '/payment'
    },
    {
      app: PermissionGroup.EVENT,
      icon: <CalendarClockIcon className={iconStyle} />,
      title: 'Arrangementer',
      description: 'Administrer arrangementer.',
      href: '/event'
    },
    {
      app: PermissionGroup.NEWS,
      icon: <CreditCardIcon className={iconStyle} />,
      title: 'Nyheter',
      description: 'Administrer nyheter.',
      href: '/news'
    },
    {
      app: PermissionGroup.JOBPOST,
      icon: <NewspaperIcon className={iconStyle} />,
      title: 'Jobbannonser',
      description: 'Administrer jobbannonser.',
      href: '/jobpost'
    },
    {
      app: PermissionGroup.GROUP,
      icon: <UsersIcon className={iconStyle} />,
      title: 'Grupper',
      description: 'Administrer grupper.',
      href: '/group'
    },
    {
      app: PermissionGroup.BANNER,
      icon: <FlagIcon className={iconStyle} />,
      title: 'Bannere',
      description: 'Administrer bannere.',
      href: '/banner'
    },
    {
      app: PermissionGroup.STRIKE,
      icon: <GripHorizontalIcon className={iconStyle} />,
      title: 'Prikker',
      description: 'Administrer prikker.',
      href: '/prikker'
    },
    {
      app: PermissionGroup.USER,
      icon: <UserIcon className={iconStyle} />,
      title: 'Brukere',
      description: 'Administrer brukere.',
      href: '/user'
    }
  ];

  return (
    <div className="py-20 px-4 md:px-12">
      <div className="pb-28 max-w-4xl w-full mx-auto text-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Administrer TIHLDE
          </h1>
          <p className="text-sm md:text-lg text-muted-foreground md:px-20">
            Velkommen til TIHLDEs adminpanel. Her kan du administrere brukere, 
            grupper, arrangementer og mer. Du kan også se en oversikt over dine rettigheter.
          </p>
        </div>
        <div className="mt-6 mx-auto">
          <Button asChild>
            <Link href="/me">
              Mine rettigheter
            </Link>
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-8 mx-auto">
        { permissionApps.map((app, index) => (
          <div
            key={index}
          >
            <Card
              className={`${!permissionGroups.includes(app.app) ?  'hidden' : ''} relative`}
            >
              <CardHeader>
                { app.icon }
                <h3 className="text-xl font-semibold leading-none tracking-tight">
                  { app.title }
                </h3>
                <p className="text-sm text-muted-foreground">
                  { app.description }
                </p>
              </CardHeader>
              <CardContent>
                <Button
                  variant="secondary" 
                  asChild
                  className="w-40"
                >
                  <Link href={app.href}>
                    Administrer
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Separator className={`${ index === permissionApps.length - 1 ? 'hidden' : '' } md:hidden`} />
          </div>
        )) }
      </div>
    </div>
  );
}


export default Home;