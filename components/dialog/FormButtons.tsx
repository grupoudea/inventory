import ReactLoading from "react-loading";

interface FormButtonsProps {
  loading: boolean;
  closeModal: () => void;
  primaryText: String;
}

const FormButtons = ({
  loading,
  closeModal,
  primaryText,
}: FormButtonsProps) => (
  <div className="flex w-full justify-center gap-4">
    <button type="submit" disabled={loading}>
      {loading ? (
        <ReactLoading type="spin" height={30} width={30} color="blue" />
      ) : (
        primaryText
      )}
    </button>
    <button
      type="button"
      disabled={loading}
      onClick={closeModal}
      className="secondary"
    >
      Cancelar
    </button>
  </div>
);

export { FormButtons };
