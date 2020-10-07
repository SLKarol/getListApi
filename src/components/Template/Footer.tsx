import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

interface Props {
  description?: string;
  title?: string;
}
const Footer: React.FC<Props> = ({ description, title }: Props) => {
  return (
    <footer>
      <Container maxWidth="lg">
        {title && (
          <Typography variant="h6" align="center" gutterBottom>
            {title}
          </Typography>
        )}
        {description && (
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            {description}
          </Typography>
        )}
      </Container>
    </footer>
  );
};

export default Footer;
