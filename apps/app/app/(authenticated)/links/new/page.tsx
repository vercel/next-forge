import { Header } from "../../components/header";
import { CreateLinkForm } from "./create-link-form";

export const metadata = {
  title: "Create Link",
  description: "Create a new short link",
};

export default function NewLinkPage() {
  return (
    <>
      <Header page="Create Link" pages={["Links", "New"]} />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="mx-auto w-full max-w-2xl">
          <CreateLinkForm />
        </div>
      </div>
    </>
  );
}
