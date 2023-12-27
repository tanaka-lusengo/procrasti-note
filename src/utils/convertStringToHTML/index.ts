import parse from 'html-react-parser';

export const convertStringToHTML = (htmlData: string) => {
  const htmlString = htmlData;
  const reactElement = parse(htmlString);

  return reactElement;
};
