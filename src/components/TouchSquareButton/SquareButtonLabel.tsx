interface SquareButtonLabelProps {
  text?: string;
}

const styles = {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const SquareButtonLabel = ({ text = "" }: SquareButtonLabelProps) => (
  <div style={styles}>
    <span>{text}</span>
  </div>
);

export default SquareButtonLabel;
