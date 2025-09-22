import { useRouter } from "next/navigation";
import Btn from "./Btn";

const FormBtn = () => {
  const router = useRouter();
  return (
    <div className="ms-auto justify-content-end dflex-wgap mt-sm-4 mt-2 save-back-button">
      <Btn className="btn-outline btn-lg" title="Back" onClick={() => router.back()} />
      <Btn className="btn-primary btn-lg" type="submit" title="Save" />
    </div>
  );
};

export default FormBtn;
