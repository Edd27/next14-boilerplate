import Backdrop from "@/components/backdrop";
import Loader from "@/components/loader";

export default function Loading() {
  return (
    <Backdrop>
      <Loader title="Redirecting to dashboard" />
    </Backdrop>
  );
}
