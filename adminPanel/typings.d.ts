type CategoryProperty = {
  name: string;
  value: string;
};

type ProductFormProps = {
  product?: {
    id: string;
    Title: string;
    Price: number;
    Description: string;
    CategoryIDs: string[];
    Colors: string[];
    Images: { id: string; img: string }[] | any;
    Properties: CategoryProperty[] | any;
  };
  allCategories:
    | {
        id: string;
        label: string;
        value: number;
        Properties: CategoryProperty[];
      }[]
    | any;
};

type CategoryFormProps = {
  category?: {
    id: string;
    label: string;
    value: number;
    Image: string;
    Properties: CategoryProperty[] | any;
    ParentId: string | null;
  };
  allCategories:
    | {
        id: string;
        label: string;
        value: number;
        Properties: CategoryProperty[];
      }[]
    | any;
};
