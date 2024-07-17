import { DatePicker } from "antd";
import { Control, Controller } from "react-hook-form";

interface TAppDatePicker {
  control: Control<any>;
  name: string;
  placeholder?: string;
  className?: string;
}

const AppDatePicker = ({
  control,
  name,
  placeholder,
  className
}: TAppDatePicker) => {
  return (
    <div className="h-full">
      <Controller
        control={control}
        name={name}
        rules={{
          required: `${name} field is required`
        }}
        render={({ field, fieldState }) => {
          return (
            <>
              <DatePicker
                className={`w-full ${className}`}
                placeholder={placeholder}
                status={fieldState.error ? "error" : undefined}
                ref={field.ref}
                name={field.name}
                onBlur={field.onBlur}
                value={field.value ? field.value : null}
                onChange={(date, dateString) => {
                  field.onChange(date);
                }}
              />
              <br />
              {fieldState.error && (
                <p className="text-bgred capitalize">
                  {fieldState.error?.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default AppDatePicker;
