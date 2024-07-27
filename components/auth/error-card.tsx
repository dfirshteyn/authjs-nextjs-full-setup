import { CardWrapper } from "./card-wrapper";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {

  return (
    <CardWrapper
      headerLabel="Uh oh! Something went wrong!"
      backButtonLabel="Go back"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        <ExclamationTriangleIcon className="text-destructive w-10 h-10" />
      </div>
    </CardWrapper>
  )
}