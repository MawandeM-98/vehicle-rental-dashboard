import * as React from 'react'
import {
  Controller,
  FieldPath,
  FieldValues,
  FormProvider,
  type Control,
  type ControllerRenderProps,
  type UseFormReturn,
} from 'react-hook-form'

interface FormProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>
  children: React.ReactNode
}

function Form<TFieldValues extends FieldValues>({ form, children }: FormProps<TFieldValues>) {
  return <FormProvider {...form}>{children}</FormProvider>
}

interface FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>
  name: TName
  render: (props: { field: ControllerRenderProps<TFieldValues, TName> }) => React.ReactNode
}

function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({ control, name, render }: FormFieldProps<TFieldValues, TName>) {
  return <Controller control={control} name={name} render={({ field }) => render({ field })} />
}

function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />
}

function FormLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={className} {...props} />
}

function FormControl({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />
}

function FormMessage({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={className} {...props}>
      {children}
    </p>
  )
}

export { Form, FormControl, FormField, FormItem, FormLabel, FormMessage }
