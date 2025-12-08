// Centralized product image mapping
import braceletImg from "@/assets/products/bracelet.jpg";
import candlesImg from "@/assets/products/candles.jpg";
import ceramicMugsImg from "@/assets/products/ceramic-mugs.jpg";
import crossStitchImg from "@/assets/products/cross-stitch.jpg";
import embroideryImg from "@/assets/products/embroidery.jpg";
import paperFlowersImg from "@/assets/products/paper-flowers.jpg";
import potteryBowlImg from "@/assets/products/pottery-bowl.jpg";
import silverNecklaceImg from "@/assets/products/silver-necklace.jpg";
import lavenderCandleImg from "@/assets/lavender-candle.jpg";

export const productImages: Record<string, string> = {
  "Beaded Bracelet": braceletImg,
  "Lavender Soy Candles": candlesImg,
  "Ceramic Mug Set": ceramicMugsImg,
  "Cross-Stitch Kit": crossStitchImg,
  "Embroidered Wall Art": embroideryImg,
  "Paper Flower Bouquet": paperFlowersImg,
  "Clay Pottery Bowl": potteryBowlImg,
  "Handmade Silver Necklace": silverNecklaceImg,
  "Handmade Candles Set": candlesImg,
  "Embroidery Hoop Art": embroideryImg,
  "Ceramic Mugs": ceramicMugsImg,
};

export const getProductImage = (name: string, fallbackUrl: string): string => {
  return productImages[name] || fallbackUrl;
};
