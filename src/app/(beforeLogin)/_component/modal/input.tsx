import { InputHTMLAttributes } from "react";

// style
import style from "@/app/(beforeLogin)/_component/modal/modal.module.css";

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
  onChange,
}: Props) {
  const withPreviewImage = type === "file" && previewUrl;

  return (
    <div
      className={withPreviewImage ? style.inputDivWithImage : style.inputDiv}
    >
      <label
        className={
          withPreviewImage ? style.inputLabelWithImage : style.inputLabel
        }
        htmlFor={id}
      >
        {label}
      </label>

      {type === "file" && previewUrl ? (
        <div className={style.inputWithImage}>
          <img src={previewUrl} alt="미리보기" />
          <input
            id={id}
            className={style.input}
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
          className={style.input}
          type={type}
          placeholder={placeholderText}
          value={type === "file" ? undefined : value}
          accept={type === "file" ? "image/*" : undefined}
          onChange={onChange}
        />
      )}
    </div>
  );
}
