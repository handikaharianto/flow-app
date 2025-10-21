"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { addTradePlan } from "@/lib/actions/trade.actions";
import { addTradePlanSchema } from "@/lib/validators";
import { TradePlan } from "@/types/trade";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  addNewTradePlanToTable: (newTradePlan: TradePlan) => void;
};

function AddTradePlan({ addNewTradePlanToTable }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useIsMobile();

  const form = useForm<z.infer<typeof addTradePlanSchema>>({
    resolver: zodResolver(addTradePlanSchema),
    defaultValues: {
      symbol: "",
      side: "LONG",
      entry: "",
    },
  });

  async function submitForm(data: z.infer<typeof addTradePlanSchema>) {
    const response = await addTradePlan(data);

    if (response.success) {
      addNewTradePlanToTable(response.data!);
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    form.reset();
    closeDrawer();
  }

  async function closeDrawer() {
    setIsOpen(false);
  }

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Add Trade Plan</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex">
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="flex flex-1 flex-col"
        >
          <DrawerHeader>
            <DrawerTitle>Add new trade plan</DrawerTitle>
            <DrawerDescription>
              Add your new trade plan by filling out the form below.
            </DrawerDescription>
          </DrawerHeader>
          {/* Add Trade Plan Form */}
          <div className="p-4">
            <FieldGroup>
              <Controller
                name="symbol"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="symbol">Symbol</FieldLabel>
                    <Input
                      {...field}
                      id="symbol"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g., $AAPL, $TSLA"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="side"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor="side">Side</FieldLabel>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="form-rhf-select-side"
                        aria-invalid={fieldState.invalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        {["LONG", "SHORT"].map((side) => (
                          <SelectItem key={side} value={side}>
                            {side}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              <Controller
                name="entry"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="entry">Entry</FieldLabel>
                    <Input
                      {...field}
                      id="symbol"
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g., 150, 250"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <DrawerFooter className="mt-auto">
            <Button type="submit">Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default AddTradePlan;
