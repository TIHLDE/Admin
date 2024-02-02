import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export type PermissionCardProps = {
    app: string;
    key: string;
    title: string;
    description: string;
};

const PermissionCard = ({ permission }: { permission: PermissionCardProps }) => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        { permission.title }
                    </CardTitle>
                    <CardDescription>
                        { permission.description }  
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};


export default PermissionCard;