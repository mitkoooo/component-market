export interface LogoProps {
  width: string;
  height: string;
}

export interface Component {
  id: number;
  created_at: string;
  description: string;
  name: string;
  image: string;
  code_tsx: string;
  code_jsx: string;
  category_name: string;
}

export interface ImageI {
  alt: string;
  src: string;
  description: string;
}
