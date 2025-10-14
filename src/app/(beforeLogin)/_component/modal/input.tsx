import { InputHTMLAttributes } from "react";

// style
import {
  inputDivWithImage,
  inputDiv,
  inputLabelWithImage,
  inputLabel,
  inputWithImage,
  input,
} from "@/app/(beforeLogin)/_component/modal/modal.css";

type Props = {
  label: string;
  placeholderText: string;
  previewUrl?: string; // 이미지 미리보기 URL
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  placeholderText,
  id,
  type,
  value,
  name,
  previewUrl,
  defaultValue,
  onChange,
}: Props) {
  const withPreviewImage = type === "file" && previewUrl;

  return (
    <div className={withPreviewImage ? inputDivWithImage : inputDiv}>
      <label
        className={withPreviewImage ? inputLabelWithImage : inputLabel}
        htmlFor={id}
      >
        {label}
      </label>

      {type === "file" && previewUrl ? (
        <div className={inputWithImage}>
          <img src={previewUrl} alt="미리보기" />
          <input
            id={id}
            className={input}
            name={name}
            type={type}
            placeholder={placeholderText}
            value={type === "file" ? undefined : value}
            accept={type === "file" ? "image/*" : undefined}
            onChange={onChange}
          />
        </div>
      ) : (
        <input
          id={id}
          name={name}
          className={input}
          type={type}
          placeholder={placeholderText}
          defaultValue={defaultValue}
          value={type === "file" ? undefined : value}
          accept={type === "file" ? "image/*" : undefined}
          onChange={onChange}
        />
      )}
    </div>
  );
}
