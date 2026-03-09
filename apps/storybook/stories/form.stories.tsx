import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/design-system/components/ui/form";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { action } from "storybook/actions";
import { object, string, type infer as zInfer } from "zod";

/**
 * Building forms with React Hook Form and Zod.
 */
const meta: Meta<typeof Form> = {
  title: "ui/Form",
  component: Form,
  tags: ["autodocs"],
  argTypes: {},
  render: (args) => <ProfileForm {...args} />,
} satisfies Meta<typeof Form>;

export default meta;

type Story = StoryObj<typeof meta>;

const formSchema = object({
  username: string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const ProfileForm = (args: Story["args"]) => {
  const form = useForm<zInfer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  function onSubmit(values: zInfer<typeof formSchema>) {
    action("onSubmit")(values);
  }
  return (
    <Form {...args} {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="username"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          className="rounded bg-primary px-4 py-2 text-primary-foreground"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Form>
  );
};

/**
 * The default form of the form.
 */
export const Default: Story = {};
