import { AlertTriangleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type AlertBoxProps = {
  title: string;
  description: string;
};

export const AlertBox: React.FC<AlertBoxProps> = ({ title, description }) => {
  return (
    <Alert>
      <AlertTriangleIcon className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">{title}</AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
      </AlertDescription>
    </Alert>
  );
};
