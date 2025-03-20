/**
 * @copyright 2025 Mihai Elisei
 * @license Apache-2.0
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

const ContactPage = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log("Form Submitted:", data);
    alert("Message sent successfully!"); // Replace with actual form submission logic
  };

  return (
    <section className="section">
      <div className="container max-w-lg mx-auto">
        <h2 className="headline-2 text-slate-900 dark:text-zinc-400 py-5 text-center">
          Get in Touch.
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 dm:w-[70%] mx-auto"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 dark:text-zinc-400 text-lg md:text-2xl">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="placeholder:text-slate-900 dark:placeholder:text-zinc-400"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 dark:text-zinc-400 text-lg md:text-2xl">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="placeholder:text-slate-900 dark:placeholder:text-zinc-400"
                      {...field}
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 dark:text-zinc-400 text-lg md:text-2xl">
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="placeholder:text-slate-900 dark:placeholder:text-zinc-400 h-50"
                      {...field}
                      placeholder="Write your message..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-fit py-2 flex items-center gap-x-2 text-slate-100 bg-slate-900 hover:bg-slate-800 dark:bg-zinc-200 dark:hover:bg-zinc-400 dark:text-zinc-900 cursor-pointer"
            >
              Send Message
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ContactPage;
