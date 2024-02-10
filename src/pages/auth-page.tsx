import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const AuthPage = () => {
  const { loginWithRedirect } = useAuth0();
  const handleRedirect = () => {
    loginWithRedirect();
  };
  return (
    <div className="flex-col">
      <div className="flex-1 h-[450px]  mt-20 flex flex-col justify-center items-center">
        <div className="w-1/2 flex flex-col justify-center gap-y-8 px-12 rounded-3xl bg-neutral-800 shadow-lg h-full text-muted">
          <h1 className="font-bold text-3xl tracking-wide">
            Always Keep Track of your Schedule! <br />
            Start using our app today.
          </h1>
          <p className="tracking-wider">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod
            sapiente dicta hic enim repellat quo odit iste, ab eveniet
            voluptates.
          </p>
          <div className="block">
            <Button
              className="w-auto font-bold tracking-wide"
              variant="secondary"
              onClick={handleRedirect}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
