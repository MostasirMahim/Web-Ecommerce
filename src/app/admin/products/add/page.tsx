"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Image, Loader2, Save, X } from "lucide-react";
import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addProduct, StoreDetails } from "@/actions/admin.action";

function AddProductPage() {
  const { id } = useParams();
  const navigate = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: StoreDetail, isLoading } = useQuery<Record<string, any> | null>(
    {
      queryKey: ["StoreDetails"],
      queryFn: async () => {
        try {
          const res = await StoreDetails();
          if (!res.success)
            throw new Error(res.error || "Something went wrong");

          return res.data;
        } catch (error) {
          console.error("Error fetching user stats:", error);
          toast({
            title: "Error",
            description: `${error}`,
            variant: "destructive",
          });
          return null;
        }
      },
    }
  );
  const { mutate: productAdd, isPending } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const result = await addProduct(data);
        if (!result.success) {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
          throw new Error(result.error);
        }

        return result;
      } catch (error: any) {
        throw new Error(error?.message || "Something went wrong");
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product Added Successfully",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["StoreDetails"] });
      createProduct.resetForm();
      navigate.push("/admin/products");
    },
  });

  const formatTextAsParagraph = (text: string) => {
    const formattedText = text.replace(/\n/g, "<br>");
    return `${formattedText}`;
  };

  const categories = [
    {
      Cat: "Men",
      SubCat: ["Clothing", "Shoes", "Accessories"],
      ID: 1,
    },
    {
      Cat: "Women",
      SubCat: ["Clothing", "Shoes", "Accessories"],
      ID: 2,
    },
    {
      Cat: "Kids",
      SubCat: ["Clothing", "Shoes", "Accessories"],
      ID: 3,
    },
  ];

  const createProduct = useFormik({
    initialValues: {
      name: "",
      price: [],
      description: "",
      image: [],
      colors: [],
      size: [],
      category: "",
      subCategory: "",
      brand: "",
      material: "",
      GWS: "",
      stock: 0,
      priceSize: "",
      shopID: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Product Name"),
      price: Yup.array()
        .required("Please Enter Product Price")
        .min(1, " Please Enter Product Price")
        .test("price", "Please provide all the price", function (value) {
          return value && value.length === this.parent.size.length;
        }),
      description: Yup.string().required("Please Enter Product Description"),
      images: Yup.array()
        .required("Please Enter Product Image")
        .min(1, " Please Enter Product Image"),
      colors: Yup.array()
        .required("Please Enter Product Colors")
        .min(1, " Please Enter Product Colors"),
      size: Yup.array()
        .required("Please Enter Product Size")
        .min(1, " Please Enter Product Size"),
      category: Yup.string().required("Please Enter Product Category"),
      subCategory: Yup.string().required("Please Enter Product Sub Category"),
      brand: Yup.string().required("Please Enter Product Brand"),
      material: Yup.string().required("Please Enter Product Material"),
      GWS: Yup.string().required("Please Enter Product GWS"),
      stock: Yup.number()
        .required("Please Enter Product Stock")
        .min(1, " Please Enter Product Stock"),
      priceSize: Yup.string(),
      shopID: Yup.string(),
    }),
    onSubmit: (values) => {
      values.description = formatTextAsParagraph(values.description);
      values.shopID = StoreDetail?._id;
      addProduct(values);
    },
  });

  const handleCustomSubmit = async () => {
    const errors = await createProduct.validateForm();
    createProduct.setTouched(
      Object.keys(createProduct.initialValues).reduce((acc: any, key: any) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Error",
        description: `${Object.values(errors)[0]}`,
        variant: "destructive",
      });
      return;
    }

    createProduct.handleSubmit();
  };
  const handleColorChenge = () => {
    const newColor = {
      name:
        (document.getElementById("colorName") as HTMLInputElement)?.value || "",
      code:
        (document.getElementById("colorCode") as HTMLInputElement)?.value || "",
    };

    if (newColor?.name && newColor?.code !== "#000000") {
      createProduct.setFieldValue("colors", [
        ...createProduct.values.colors,
        newColor,
      ]);
      //clearing the input fields
      const colorNameInput = document.getElementById(
        "colorName"
      ) as HTMLInputElement | null;
      if (colorNameInput) {
        colorNameInput.value = "";
      }
      const colorCodeInput = document.getElementById(
        "colorCode"
      ) as HTMLInputElement | null;
      if (colorCodeInput) {
        colorCodeInput.value = "";
      }
    }
    if (!newColor?.name) {
      toast({
        title: "Error",
        description: "Please enter color name",
        variant: "destructive",
      });
    } else if (newColor?.code === "#000000") {
      toast({
        title: "Error",
        description: "Please enter color",
        variant: "destructive",
      });
    }
  };

  const handleSizeChenge = () => {
    const sizeElement = document.getElementById(
      "size"
    ) as HTMLInputElement | null;
    const newSize = sizeElement ? sizeElement.value : "";
    const isSizeExists = createProduct.values.size.some(
      (size) => size === newSize
    );
    if (isSizeExists) {
      toast({
        title: "Error",
        description: "Size already exists",
        variant: "destructive",
      });
      return;
    }
    if (newSize) {
      createProduct.setFieldValue("size", [
        ...createProduct.values.size,
        newSize,
      ]);
      const sizeElement = document.getElementById(
        "size"
      ) as HTMLInputElement | null;
      if (sizeElement) {
        sizeElement.value = "";
      }
    } else {
      toast({
        title: "Error",
        description: "Please enter size",
        variant: "destructive",
      });
    }
  };

  const handlePriceChenge = () => {
    const newPrice = {
      size: createProduct.values.priceSize,
      sellPrice: parseInt((document.getElementById("sellPrice") as HTMLInputElement)?.value || "", 10),
      mrp: parseInt((document.getElementById("mrp") as HTMLInputElement)?.value || "", 10),
    };

      
    if (newPrice?.sellPrice > newPrice?.mrp) {
      toast({
        title: "Error",
        description: "Sell Price should be less than MRP",
        variant: "destructive",
      });
      return;
    }
    const isSizeExists = createProduct.values.price.some(
      (item: any) => item.size === newPrice.size
    );
    if (isSizeExists) {
      toast({
        title: "Error",
        description: "Price of this Size already exists",
        variant: "destructive",
      });
      return;
    }
    if (newPrice?.size && newPrice?.sellPrice && newPrice?.mrp) {
      createProduct.setFieldValue("price", [
        ...createProduct.values.price,
        newPrice,
      ]);
      //clearing the input fields
      const sellPriceInput = document.getElementById(
        "sellPrice"
      ) as HTMLInputElement | null;
      if (sellPriceInput) {
        sellPriceInput.value = "";
      }
      const mrpInput = document.getElementById(
        "mrp"
      ) as HTMLInputElement | null;
      if (mrpInput) {
        mrpInput.value = "";
      }
    } else {
      toast({
        title: "Error",
        description: "Please enter price",
        variant: "destructive",
      });
    }
  };
  const imgRef = useRef<HTMLInputElement>(null);
  const imgUploader = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files ? Array.from(e.target.files) : [];

    const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"];
    const MAX_SIZE_MB = 1;
    const MAX_FILES = 3;

    if (files.length > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} files.`);
      return;
    }

    const validFiles = files.filter((file) => {
      const fileSize = file.size / (1024 * 1024 * 2);
      return allowedExtensions.includes(file.type) && fileSize <= MAX_SIZE_MB;
    });

    if (validFiles.length === 0) {
      alert("Some files have invalid formats. Only JPEG and PNG are allowed.");
      return;
    }

    if (validFiles.length > 0) {
      const images: string[] = [...createProduct.values.image];
      validFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (typeof reader.result === "string") {
            images.push(reader.result);
            createProduct.setFieldValue("images", images);
          } else {
            console.error("FileReader result is not a string");
          }
        };
        reader.onerror = () => {
          console.error(`Failed to read file: ${file.name}`);
        };

        reader.readAsDataURL(file);
      });

      if (imgRef.current) {
        imgRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    createProduct.setFieldValue(
      "images",
      createProduct.values.image.filter((_, i) => i !== index)
    );
  };
  return (
    <div className="w-full min-h-screen px-4 py-8 md:px-8">
      <main>
        <div className=" ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCustomSubmit();
            }}
            className="space-y-6"
          >
            <div className="grid lg:grid-cols-2 gap-4">
              <Card className="">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Enter the basic details about the product.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 ">
                  <div className="flex justify-start items-center gap-2 w-full bg-white p-2 rounded-lg shadow-sm">
                    <header className="w-auto flex justify-start items-center gap-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">Select Category</Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56 justify-start ml-10">
                          {categories.map((category) => (
                            <DropdownMenuSub key={category.ID}>
                              <DropdownMenuSubTrigger
                                onClick={() =>
                                  createProduct.setFieldValue(
                                    "category",
                                    category.Cat
                                  )
                                }
                              >
                                {category.Cat}
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  {category.SubCat.map((subCat) => (
                                    <DropdownMenuItem
                                      key={subCat}
                                      onClick={() => {
                                        createProduct.setFieldValue(
                                          "subCategory",
                                          subCat
                                        );
                                        createProduct.setFieldValue(
                                          "category",
                                          category.Cat
                                        );
                                      }}
                                    >
                                      {subCat}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <div className="flex justify-start items-center gap-2">
                        <p className="bg-sky-400 text-white px-3 py-1 rounded-md">
                          {createProduct.values.category}
                        </p>
                        <p className="bg-sky-600 text-white px-3 py-1 rounded-md">
                          {createProduct.values.subCategory}
                        </p>
                      </div>
                    </header>
                    <div className="w-auto"></div>
                    {createProduct.touched.category &&
                      createProduct.errors.category && (
                        <p className="text-red-500 font-quicksand text-xs">
                          {createProduct.errors.category}
                        </p>
                      )}
                  </div>

                  <div className="w-full bg-white p-2 rounded-lg space-y-1 shadow-sm">
                    <p>Product Name</p>
                    <Input
                      type="text"
                      name="name"
                      onChange={createProduct.handleChange}
                      value={createProduct.values.name}
                      onBlur={createProduct.handleBlur}
                      placeholder="Name"
                      className="custom-input"
                    />
                    {createProduct.touched.name &&
                      createProduct.errors.name && (
                        <p className="text-red-500 font-quicksand text-xs">
                          {createProduct.errors.name}
                        </p>
                      )}
                  </div>

                  <div className="w-full bg-white p-2 rounded-lg space-y-1 shadow-sm">
                    <p>Product Description </p>
                    <textarea
                      name="description"
                      onChange={createProduct.handleChange}
                      value={createProduct.values.description}
                      onBlur={createProduct.handleBlur}
                      placeholder="................🖋"
                      className="border-[1px] border-dashed border-slate-400 rounded-md w-full h-[80px] outline-none p-2 
    focus-within:border-sky-500 overflow-y-scroll"
                    />
                    {createProduct.touched.description &&
                      createProduct.errors.description && (
                        <p className="text-red-500 font-quicksand text-xs">
                          {createProduct.errors.description}
                        </p>
                      )}
                  </div>
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader>
                  <CardTitle>Colors & Sizes</CardTitle>
                  <CardDescription>
                    Enter the colors and sizes of the product.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 ">
                  <section className="w-full flex flex-col justify-between items-start gap-5">
                    <div className=" bg-white p-2 rounded-lg space-y-1 shadow-sm">
                      <p className="w-auto">Select Colors </p>
                      <div className="flex justify-start items-center gap-1 p-1 font-lato">
                        <Input
                          type="text"
                          id="colorName"
                          placeholder="e.g Red , Blue"
                          onBlur={createProduct.handleBlur}
                          className="w-full
                 h-[35px] border-[1px] border-slate-400 border-dashed rounded-md p-1 outline-none "
                        />
                        <div className="h-10 w-[70px] min-w-5">
                          <input
                            type="color"
                            id="colorCode"
                            className="w-full h-10 cursor-pointer  "
                          />
                        </div>
                        <div className="w-auto h-full flex flex-center">
                          <Button onClick={handleColorChenge} type="button">
                            Add
                          </Button>
                        </div>
                      </div>
                      {createProduct.values.colors.length > 0 &&
                        createProduct.values.colors.map((color: any, index) => (
                          <div
                            key={index}
                            className="w-[240px] font-lato flex justify-between items-center gap-2 bg-slate-300 rounded-md p-1 my-1"
                          >
                            <div className="w-full flex justify-start items-center gap-2 pl-1">
                              <div
                                className="w-[20px] h-[20px] rounded-full border-[1px] border-black "
                                style={{ backgroundColor: color.code }}
                              ></div>
                              <span className="w-auto">{color.name}</span>
                            </div>
                            <X
                              onClick={() =>
                                createProduct.setFieldValue(
                                  "colors",
                                  createProduct.values.colors.filter(
                                    (_, i) => i !== index
                                  )
                                )
                              }
                              className="cursor-pointer w-5 h-5"
                            />
                          </div>
                        ))}
                      {createProduct.touched.colors &&
                        createProduct.errors.colors && (
                          <p className="text-red-500 font-quicksand text-xs">
                            {createProduct.errors.colors}
                          </p>
                        )}
                    </div>
                    <div className="w-full p-2 rounded-lg space-y-1 shadow-sm">
                      <p className="w-auto">Select Sizes </p>
                      <div className="flex  w-full justify-start  items-center gap-4  rounded-md p-1">
                        <Input
                          type="text"
                          id="size"
                          placeholder="e.g. Small, Medium, Large"
                          onBlur={createProduct.handleBlur}
                          className=" w-1/2 
                 h-[35px] border-[1px] border-slate-400 border-dashed rounded-md p-1 outline-none"
                        />

                        <div className=" h-full flex flex-center">
                          <Button onClick={handleSizeChenge} type="button">
                            Add
                          </Button>
                        </div>
                      </div>

                      {createProduct.values.size.length > 0 &&
                        createProduct.values.size.map((size, index) => (
                          <div
                            key={`${size}-${index}`}
                            className="w-[200px] flex justify-between items-center gap-2 bg-slate-300 rounded-md p-1 my-1"
                          >
                            <div className="w-full flex justify-start items-center gap-2 pl-1">
                              <span className="w-auto">{size}</span>
                            </div>
                            <X
                              onClick={() =>
                                createProduct.setFieldValue(
                                  "size",
                                  createProduct.values.size.filter(
                                    (_, i) => i !== index
                                  )
                                )
                              }
                              className="cursor-pointer w-5 h-5"
                            />
                          </div>
                        ))}

                      {createProduct.errors.size && createProduct.touched.size &&
                        createProduct.errors.size && (
                          <p className="text-yellow-500 font-quicksand text-xs">
                            Please add size
                          </p>
                        )}
                    </div>
                  </section>
                </CardContent>
              </Card>

              <Card className="">
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Add minimum 1 Images. First image will be set as cover. *Max
                    2MB per image
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 ">
                  <div className="w-full bg-white p-2 rounded-lg space-y-1 shadow-sm">
                    <p>Add Product Images</p>
                    <section className="flex justify-start items-center gap-2">
                      <div
                        onClick={() => imgRef.current?.click()}
                        className="w-14 h-14 bg-slate-200 flex  justify-center items-center cursor-pointer hover:border-2 hover:border-sky-500 rounded-md hover:duration-300"
                      >
                        <Image className="w-8 h-8 " />
                      </div>
                      <input
                        type="file"
                        hidden
                        ref={imgRef}
                        multiple
                        accept="image/png, image/jpeg"
                        onChange={(e) => imgUploader(e)}
                        onBlur={createProduct.handleBlur}
                      />
                      {createProduct.values.image.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-14 h-14 bg-slate-200 flex flex-center border-2 border-blue-500"
                        >
                          <img src={image} alt={image} />
                          <X
                            onClick={() => removeImage(index)}
                            className="absolute top-0 right-0 w-4 h-4 cursor-pointer text-red-500"
                          />
                        </div>
                      ))}
                    </section>
                    {createProduct.errors.image &&
                      createProduct.touched.image && (
                        <p className="text-red-500 font-quicksand text-xs">
                          {createProduct.errors.image}
                        </p>
                      )}
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    Customize the product details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 ">
                  <section className="w-full flex justify-between items-center gap-5">
                    <div className=" p-2 rounded-lg space-y-1 shadow-sm">
                      <p>Brand</p>
                      <Input
                        type="text"
                        name="brand"
                        onChange={createProduct.handleChange}
                        value={createProduct.values.brand}
                        onBlur={createProduct.handleBlur}
                        placeholder="e.g. Nike, Adidas"
                      />
                      {createProduct.touched.brand &&
                        createProduct.errors.brand && (
                          <p className="text-red-500 font-quicksand text-xs">
                            {createProduct.errors.brand}
                          </p>
                        )}
                    </div>
                    <div className=" p-2 rounded-lg space-y-1 shadow-sm">
                      <p>Material</p>
                      <Input
                        type="text"
                        name="material"
                        onChange={createProduct.handleChange}
                        value={createProduct.values.material}
                        onBlur={createProduct.handleBlur}
                        placeholder="Cotton, Leather"
                      />
                      {createProduct.touched.material &&
                        createProduct.errors.material && (
                          <p className="text-red-500 font-quicksand text-xs">
                            {createProduct.errors.material}
                          </p>
                        )}
                    </div>
                  </section>
                  <section className="w-full flex justify-between items-center gap-5">
                    <div className=" p-2 rounded-lg space-y-1 shadow-sm">
                      <p className="text-sm">Gurrantee Or Warranty</p>
                      <Input
                        type="text"
                        name="GWS"
                        onChange={createProduct.handleChange}
                        value={createProduct.values.GWS}
                        onBlur={createProduct.handleBlur}
                        placeholder="e.g 2 Years Replacement Warranty"
                      />
                      {createProduct.touched.GWS &&
                        createProduct.errors.GWS && (
                          <p className="text-red-500 font-quicksand text-xs">
                            {createProduct.errors.GWS}
                          </p>
                        )}
                    </div>
                    <div className=" p-2 rounded-lg space-y-1 shadow-sm">
                      <p>Stock</p>
                      <Input
                        name="stock"
                        onChange={createProduct.handleChange}
                        value={createProduct.values.stock}
                        onBlur={createProduct.handleBlur}
                        placeholder="Product Stock"
                        className="flex-1"
                      />
                      {createProduct.touched.stock &&
                        createProduct.errors.stock && (
                          <p className="text-red-500 font-quicksand text-xs">
                            {createProduct.errors.stock}
                          </p>
                        )}
                    </div>
                  </section>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full">
              <CardHeader>
                <CardTitle>Product Pricing</CardTitle>
                <CardDescription>
                  First Add Size Then Select Size To Add Price
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 ">
                <div className="w-full p-2 rounded-lg shadow-sm">
                  <div>
                    <section className="w-full bg-white rounded-lg space-y-1 shadow-sm flex justify-start items-center gap-3">
                      <div className="flex justify-start items-center gap-2">
                        <div className="h-full  my-2 pl-1">
                          <Select
                            onValueChange={(size) =>
                              createProduct.setFieldValue("priceSize", size)
                            }
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select Size" />
                            </SelectTrigger>
                            <SelectContent>
                              {createProduct.values.size.map(
                                (size: any, index) => (
                                  <SelectItem key={index} value={size}>
                                    {size}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className="w-full gap-4 flex flex-col md:flex-row justify-start items-center">
                    <Input
                      type="text"
                      id="sellPrice"
                      onBlur={createProduct.handleBlur}
                      placeholder="Selling Price"
                      className=" md:w-1/3"
                    />

                    <Input
                      id="mrp"
                      onBlur={createProduct.handleBlur}
                      placeholder="Maximum Price MRP"
                      className=" md:w-1/3"
                    />
                    <div className="w-auto h-full flex flex-center">
                      <Button onClick={handlePriceChenge} type="button">
                        Add
                      </Button>
                    </div>
                  </div>
                  <div>
                    {createProduct.values.price.length > 0 &&
                      createProduct.values.price.map((price: any, index) => (
                        <div
                          key={index}
                          className="w-[350px] flex justify-between items-center gap-2 bg-slate-100 rounded-md p-1 my-1"
                        >
                          <div className="w-full flex justify-start items-center gap-2 pl-1">
                            <span className="w-auto">Size : {price.size}</span>
                            <span className="w-auto">
                              Selling Prize : {price?.sellPrice}
                            </span>
                            <span className="w-auto">MRP : {price.mrp}</span>
                          </div>
                          <X
                            onClick={() =>
                              createProduct.setFieldValue(
                                "price",
                                createProduct.values.price.filter(
                                  (_, i) => i !== index
                                )
                              )
                            }
                            className="cursor-pointer w-5 h-5"
                          />
                        </div>
                      ))}
                    {createProduct.errors.price &&
                      createProduct.touched.price && (
                        <p className="text-red-500 font-quicksand text-xs">
                          {createProduct.errors.price}
                        </p>
                      )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4 w-full">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Product
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddProductPage;
