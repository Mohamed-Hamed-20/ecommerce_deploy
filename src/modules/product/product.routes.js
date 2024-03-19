import { Router } from "express";
import * as pc from "./controller/product.js";
import { isAuth, roles } from "../../middleware/authentication.js";
import { multerCloudFunction } from "../../utils/multerCloud.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import { valid } from "../../middleware/validation.js";
import * as validschema from "./controller/product.vaild.schema.js";
const router = Router({ mergeParams: true });

router.post(
  "/createProduct",
  isAuth([roles.admin]),
  multerCloudFunction(allowedExtensions.Image).array("image", 3),
  valid(validschema.createProductSchema),
  pc.createProduct
);

router.put(
  "/updateProduct",
  isAuth([roles.admin]),
  multerCloudFunction(allowedExtensions.Image).array("image", 3),
  valid(validschema.updateProductSchema),
  pc.updateProduct
);

router.get("/getProduct", pc.getProduct);
router.get("/searchByCategoryId", pc.searchByCategoryId);
export default router;
