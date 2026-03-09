const { useState, useMemo, useEffect } = React;

// ── ITEM DATA ────────────────────────────────────────────────────────────────
const ALL_ITEMS = [
  { id: "28073", name: "Rotisserie Rib Glaze 4/1G", category: "Dry Ingredients", barcode: "096619280736" },
  { id: "149102", name: "Crouton Garlic & Cheese", category: "Dry Ingredients", barcode: "400001491027" },
  { id: "1038590", name: "Garlic Pepper Seasoning", category: "Dry Ingredients", barcode: "400010385904" },
  { id: "1859730", name: "Carne Asada Seasoning", category: "Dry Ingredients", barcode: "850048928695" },
  { id: "1066294", name: "Souvlaki Seasoning 20 LBS", category: "Dry Ingredients", barcode: "400010662944" },
  { id: "1098118", name: "Meatloaf Seasoning 4/5LB", category: "Dry Ingredients", barcode: "400010981182" },
  { id: "1241421", name: "Ceviche Seasoning 10 LBS", category: "Dry Ingredients", barcode: "499996766746" },
  { id: "1197884", name: "Natural Roasted Chopped Garlic", category: "Dry Ingredients", barcode: "074574543614" },
  { id: "1533724", name: "Sliced Black Olives 55 oz", category: "Dry Ingredients", barcode: "053800101507" },
  { id: "1421478", name: "Stir Fry Sauce 4/1G (Shelf Stable)", category: "Dry Ingredients", barcode: "733142210166" },
  { id: "1948032", name: "Hot Honey", category: "Dry Ingredients", barcode: "030042004131" },
  { id: "1932140", name: "Garlic Rosemary Seasoning", category: "Dry Ingredients", barcode: "061903810851" },
  { id: "1731902", name: "Sliced Black Olives 33oz", category: "Dry Ingredients", barcode: "053800097305" },
  { id: "1938378", name: "Cube Steak Seasoning (PR only)", category: "Dry Ingredients", barcode: "850070071185" },
  { id: "41182", name: "Platter Combo Pack 25CT", category: "Packaging", barcode: "039982025855" },
  { id: "41183", name: "64oz Container Combo Pack", category: "Packaging", barcode: "039982025862" },
  { id: "41381", name: "24oz Clear Square Bowl", category: "Packaging", barcode: "039982024032" },
  { id: "42121", name: "12 oz Micro Cup & Lid", category: "Packaging", barcode: "096619421213" },
  { id: "150700", name: "4 oz Portion Cup", category: "Packaging", barcode: "400001507001" },
  { id: "150701", name: "4 oz Portion Cup Lid", category: "Packaging", barcode: "400001507018" },
  { id: "1746780", name: "Small Sushi Combo", category: "Packaging", barcode: "499995487093" },
  { id: "531539", name: "Aluminum Tray W/Lid 125CT", category: "Packaging", barcode: "016194063059" },
  { id: "1012601", name: "Aluminum Tray W/Lid 150 Count", category: "Packaging", barcode: "097111995455" },
  { id: "41035", name: "Rib Container Combo Pack", category: "Packaging", barcode: "039982025633" },
  { id: "1166232", name: "Lid for Dual Compartment", category: "Packaging", barcode: "039982035656" },
  { id: "1166229", name: "CPET 2 Compartment Base", category: "Packaging", barcode: "039982035649" },
  { id: "1932062", name: "Clear 12oz Square Combo", category: "Packaging", barcode: "039982047529" },
  { id: "1944820", name: "New Rib Container Combo", category: "Packaging", barcode: "039982047499" },
  { id: "1135933", name: "Clear Large Salad Cont. 100/CS", category: "Packaging", barcode: "039982034956" },
  { id: "1234196", name: "Clear 32 oz Square Bowl Combo 75 CT", category: "Packaging", barcode: "039982037032" },
  { id: "1310369", name: "Clear Salad Cont. Combo Pack", category: "Packaging", barcode: "039982039692" },
  { id: "1377033", name: "Combo Tray Pack Tall Lid", category: "Packaging", barcode: "499997971149" },
  { id: "1703072", name: "12x7 Pulp Tray", category: "Packaging", barcode: "039982043958" },
  { id: "1703086", name: "Lid for 12x7 Pulp Tray", category: "Packaging", barcode: "039982044139" },
  { id: "1743404", name: "Comp Square Salad Bowl", category: "Packaging", barcode: "039982043408" },
  { id: "1743439", name: "Square Salad Lid", category: "Packaging", barcode: "039982043521" },
  { id: "1779906", name: "Rotisserie Chicken Bags", category: "Packaging", barcode: "842644086022" },
  { id: "2002667", name: "Burger Seasoning", category: "Seasonal Dry/Packaging", barcode: "060612555480" },
  { id: "1999846", name: "Breakfast Seasoning", category: "Seasonal Dry/Packaging", barcode: "060612555343" },
  { id: "1999691", name: "Honey Garlic Seasoning", category: "Seasonal Dry/Packaging", barcode: "060612555312" },
  { id: "1999692", name: "Hot Italian Seasoning", category: "Seasonal Dry/Packaging", barcode: "060612555213" },
  { id: "1999717", name: "Mild Italian Seasoning", category: "Seasonal Dry/Packaging", barcode: "060612555411" },
  { id: "2003707", name: "Tubed Sheep Casing", category: "Seasonal Dry/Packaging", barcode: "860014892714" },
  { id: "2001190", name: "Tubed Hog Casing", category: "Seasonal Dry/Packaging", barcode: "860014892707" },
  { id: "1140624", name: "Chicken Enchilada BK Kit", category: "Refrigerated Ingredients", barcode: "455011465940" },
  { id: "1735257", name: "3oz Caesar Pouches", category: "Refrigerated Ingredients", barcode: "041335372981" },
  { id: "34614", name: "Cocktail Sauce Cup 4oz", category: "Refrigerated Ingredients", barcode: "026700131837" },
  { id: "42897", name: "Dijon Mayonnaise", category: "Refrigerated Ingredients", barcode: "400000428970" },
  { id: "39101", name: "Shrimp Salad Dressing", category: "Refrigerated Ingredients", barcode: "096619391011" },
  { id: "1455825", name: "Fresh Yakisoba Noodles", category: "Refrigerated Ingredients", barcode: "499997528305" },
  { id: "1462735", name: "Stir Fry Sauce 4/1G (Refrigerated)", category: "Refrigerated Ingredients", barcode: "786764881146" },
  { id: "1506878", name: "Cilantro Lime Crema Cups", category: "Refrigerated Ingredients", barcode: "013454381953" },
  { id: "1506885", name: "Restaurant Style Salsa Cups", category: "Refrigerated Ingredients", barcode: "013454381946" },
  { id: "426362", name: "Cranberry Cream Cheese", category: "Refrigerated Ingredients", barcode: "759024201411" },
  { id: "1699178", name: "Cocktail Sauce Foil Cups (Kens)", category: "Refrigerated Ingredients", barcode: "041335372455" },
  { id: "539285", name: "Bulgogi BBQ Sauce 4/1G", category: "Refrigerated Ingredients", barcode: "786764880231" },
  { id: "1829432", name: "Grain Blend", category: "Refrigerated Ingredients", barcode: "072106451499" },
  { id: "1990797", name: "Pineapple Dressing", category: "Refrigerated Ingredients", barcode: "732869937059" },
  { id: "1927562", name: "Pizza Soppressata 6/2 LBS", category: "Refrigerated Ingredients", barcode: "810076631646" },
  { id: "1990439", name: "Broccoli Caesar Bake Kit", category: "Refrigerated Ingredients", barcode: "030223063575" },
  { id: "1829434", name: "Celery Grain Dressing", category: "Refrigerated Ingredients", barcode: "786764881177" },
  { id: "1829711", name: "Grillo's Pickles", category: "Refrigerated Ingredients", barcode: "858996005796" },
  { id: "1828167", name: "Garlic Herb Aioli", category: "Refrigerated Ingredients", barcode: "013454384923" },
  { id: "1476654", name: "Chipotle Chicken", category: "Refrigerated Ingredients", barcode: "070311008255" },
  { id: "1988670", name: "Garlic Aioli & Dill Pickles", category: "Refrigerated Ingredients", barcode: "013454385753" },
  { id: "1935947", name: "Broccoli Salad Kit", category: "Refrigerated Ingredients", barcode: "013454385678" },
  { id: "44284", name: "Sliced Swiss 6/1.5#", category: "Refrigerated Ingredients", barcode: "096619442843" },
  { id: "748666", name: "Shredded Mild Cheddar", category: "Refrigerated Ingredients", barcode: "400007486669" },
  { id: "1613423", name: "Cheddar Cheese Slcd 6/1.5", category: "Refrigerated Ingredients", barcode: "071905944021" },
  { id: "1749273", name: "Sliced Provolone 27LB New lg Box", category: "Refrigerated Ingredients", barcode: "499995384941" },
  { id: "1751465", name: "Cheddar Cheese Cubes", category: "Refrigerated Ingredients", barcode: "088231424338" },
  { id: "1751474", name: "Gouda Cheese Cubes", category: "Refrigerated Ingredients", barcode: "088231424345" },
  { id: "1892661", name: "Ginger Packet", category: "Refrigerated Ingredients", barcode: "499994614889" },
  { id: "1968179", name: "Corn Chowder", category: "Refrigerated Ingredients", barcode: "072106424318" },
  { id: "1924262", name: "Dijon Mayonnaise 3oz", category: "Refrigerated Ingredients", barcode: "041335375012" },
  { id: "1483282", name: "Brown Gravy", category: "Refrigerated Ingredients", barcode: "072106131551" },
  { id: "1114366", name: "Chicken Salad Dressing HPP w/ Vegetables", category: "Refrigerated Ingredients", barcode: "400011143664" },
  { id: "39455", name: "Fresh Alfredo Sauce", category: "Refrigerated Ingredients", barcode: "400000394558" },
  { id: "39276", name: "Rotisserie Chicken Breast", category: "Refrigerated Ingredients", barcode: "094922188335" },
  { id: "1988486", name: "Mini Iceberg Heads", category: "Refrigerated Ingredients", barcode: "030223063551" },
  { id: "2031267", name: "Tomato Basil Soup", category: "Refrigerated Ingredients", barcode: "856372008324" },
  { id: "1787980", name: "Platter Salami + Soppressata", category: "Refrigerated Ingredients", barcode: "043500787132" },
  { id: "692860", name: "Stuffed Pepper Base", category: "Refrigerated Ingredients", barcode: "096619692866" },
  { id: "1098141", name: "Meatloaf Kit", category: "Refrigerated Ingredients", barcode: "400010981410" },
  { id: "1833268", name: "Yakisoba 4 oz Pouches (Rikki)", category: "Refrigerated Ingredients", barcode: "786764881101" },
  { id: "1841996", name: "Yakisoba 4 oz Pouches (Hugo/Splendid)", category: "Refrigerated Ingredients", barcode: "733142522245" },
  { id: "1507014", name: "Golden Blend Tortilla (Taco)", category: "Refrigerated Ingredients", barcode: "079341220378" },
  { id: "1623640", name: "White Flour Tortilla", category: "Refrigerated Ingredients", barcode: "079341221498" },
  { id: "1623068", name: "Refried Beans w/ Chicken Broth", category: "Refrigerated Ingredients", barcode: "829793044912" },
  { id: "1778732", name: '14" Flour Tortilla (PR Only)', category: "Refrigerated Ingredients", barcode: "079341222501" },
  { id: "1562500", name: "Yakisoba Style Chicken Thighs", category: "Refrigerated Ingredients", barcode: "499996372350" },
  { id: "1970866", name: "Cilantro Lime Sauce", category: "Refrigerated Ingredients", barcode: "499994138316" },
  { id: "1805273", name: "Balsamic Vinaigrette", category: "Refrigerated Ingredients", barcode: "026700111099" },
  { id: "1594857", name: "Beef Chili Base", category: "Refrigerated Ingredients", barcode: "072106337144" },
  { id: "1990443", name: "Trotolle Pasta + Mozrella Pearls Kit", category: "Refrigerated Ingredients", barcode: "850035666340" },
  { id: "1963966", name: "Caesar Wrap Kit", category: "Refrigerated Ingredients", barcode: "860009262249" },
  { id: "2001613", name: "Cheese Cube + Meat Bundle", category: "Refrigerated Ingredients", barcode: "088231426394" },
  { id: "87745", name: "Rotisserie Chicken", category: "Rotisserie Chicken", barcode: "023700877451" },
  { id: "40348", name: "Pot Pie Filling", category: "Seasonal Refrigerated", barcode: "096619403486" },
  { id: "41216", name: "Shepherd's Pie Kit", category: "Seasonal Refrigerated", barcode: "071117615548" },
  { id: "32541", name: "Yukon Gold Mash Potato", category: "Seasonal Refrigerated", barcode: "071117615494" },
  { id: "33562", name: "Frz Pre-Cked Penne Pasta", category: "Frozen Ingredients", barcode: "096619335626" },
  { id: "1933022", name: "Frz Beef Birria Taco Kit", category: "Frozen Ingredients", barcode: "087427445195" },
  { id: "36427", name: "Frz Shrimp 50/70 Tail Off", category: "Frozen Ingredients", barcode: "072087010982" },
  { id: "40514", name: "Frz Pre-Cooked Cavatappi", category: "Frozen Ingredients", barcode: "096619405145" },
  { id: "1996094", name: "Frz Grilled Cheese", category: "Frozen Ingredients", barcode: "722652293004" },
  { id: "642597", name: "Frz Roller Bread 36/6.5", category: "Frozen Ingredients", barcode: "400006425973" },
  { id: "14507", name: "Frz Pre-Sliced Bulgogi", category: "Frozen Ingredients", barcode: "633920600960" },
  { id: "1990870", name: "Frz Kalua Pork w/ Ginger Rice", category: "Frozen Ingredients", barcode: "706073330401" },
  { id: "1725250", name: "Frz Mediterranean Orzo", category: "Frozen Ingredients", barcode: "400017252506" },
  { id: "1041810", name: "Frozen Slow Roasted Cherry Tomatoes", category: "Frozen Ingredients", barcode: "499995384965" },
  { id: "1990736", name: "Frz Braised Beef Kit", category: "Frozen Ingredients", barcode: "706073327203" },
  { id: "1818305", name: "Frozen Pesto Dollops (0.75 oz)", category: "Frozen Ingredients", barcode: "630361420324" },
  { id: "1829436", name: "Frz Sandwich Bread", category: "Frozen Ingredients", barcode: "196633893741" },
  { id: "1939068", name: "Frz Four Meat Crust", category: "Frozen Ingredients", barcode: "499994343901" },
  { id: "1986884", name: "Bolognese Sauce", category: "Frozen Ingredients", barcode: "048769840079" },
  { id: "1987081", name: "Four Cheese Ravioli", category: "Frozen Ingredients", barcode: "048769840031" },
  { id: "1770645", name: "Frz Shrimp 21/25 Tail On", category: "Frozen Ingredients", barcode: "843237005895" },
  { id: "1757203", name: "Frz Cilantro Lime Rice", category: "Frozen Ingredients", barcode: "850035666081" },
  { id: "1982234", name: "Frz Pepperoni Pizza Crust", category: "Frozen Ingredients", barcode: "075706312924" },
  { id: "578543", name: "Frz Pie Shells/Strips", category: "Frozen Ingredients", barcode: "042636315127" },
  { id: "1188954", name: "Frz Pie Shells", category: "Frozen Ingredients", barcode: "042636610185" },
  { id: "569535", name: "Tortellini Pasta", category: "Frozen Ingredients", barcode: "096619569533" },
  { id: "955534", name: "Chicken Broth w/ Noodles", category: "Frozen Ingredients", barcode: "049275910430" },
  { id: "1735944", name: "Frz Sprouted Bread", category: "Frozen Ingredients", barcode: "499995494541" },
  { id: "1944815", name: "Frz Homestyle Chicken", category: "Frozen Ingredients", barcode: "854127002931" },
  { id: "1892894", name: "Wasabi Packet", category: "Frozen Ingredients", barcode: "499994615282" },
  { id: "1895564", name: "Frz Hokkaido Scallops 14/20s", category: "Frozen Ingredients", barcode: "499994615275" },
  { id: "1968050", name: "Fzn Belgian Waffle", category: "Frozen Ingredients", barcode: "812199022363" },
  { id: "1982230", name: "Frz Cheese Pizza Crust", category: "Frozen Ingredients", barcode: "075706312917" },
  { id: "2005120", name: "Frz Elbow Macaroni", category: "Frozen Ingredients", barcode: "499993922794" },
  { id: "1297033", name: "Butter Croissants D63", category: "Dept 62 Bakery", barcode: "499998318363" },
  { id: "45563", name: "Cream Cheese 30# PN#74536", category: "Dept 62 Bakery", barcode: "041389300008" },
  { id: "1065184", name: "TFPP Pie Container w/Ring", category: "Dept 62 Bakery", barcode: "400010651849" },
  { id: "45567", name: "Whole Liquid Egg 2/17.5 (NE Only)", category: "Dept 62 Bakery", barcode: "096619455676" },
  { id: "1105711", name: "1 LB Liquid Egg", category: "Dept 62 Bakery", barcode: "400011057114" },
  { id: "570944", name: "Sour Cream", category: "Dept 62 Bakery", barcode: "073420003456" },
  { id: "1947972", name: "Whole Liquid Eggs 2/20", category: "Dept 62 Bakery", barcode: "499994299758" },
  { id: "4193", name: "Organic Limes", category: "Dept 65 Produce", barcode: "" },
  { id: "77053", name: "Grape Tomatoes", category: "Dept 65 Produce", barcode: "" },
  { id: "96716", name: "Organic Baby Spinach", category: "Dept 65 Produce", barcode: "" },
  { id: "81393", name: "Conventional Lime (5LB)", category: "Dept 65 Produce", barcode: "" },
  { id: "3923", name: "Conventional Lime (3LB)", category: "Dept 65 Produce", barcode: "" },
  { id: "60357", name: "Mixed Bell Peppers", category: "Dept 65 Produce", barcode: "" },
  { id: "1096379", name: "Organic Mixed Bell Peppers", category: "Dept 65 Produce", barcode: "" },
  { id: "140027", name: "FS Shredded Mozz/Prov 30#", category: "Dept 88 Food Court", barcode: "400001400272" },
  { id: "326926", name: "FS Shred Parm Chz 6/5# CS", category: "Dept 88 Food Court", barcode: "096619326921" },
  { id: "990551", name: "KS Italian Basil Pesto", category: "Dept 19 Deli", barcode: "096619905515" },
  { id: "1745059", name: "Wasabi", category: "D63 Sushi/Sashimi", barcode: "074410340216" },
  { id: "1730929", name: "Pickled Ginger", category: "D63 Sushi/Sashimi", barcode: "074410605285" },
  { id: "1839815", name: "Soy Sauce", category: "D63 Sushi/Sashimi", barcode: "073890559164" },
  { id: "1914068", name: "Fzn Bulk Sushi Rice", category: "D63 Sushi/Sashimi", barcode: "811481021121" },
  { id: "1914166", name: "Frz Nigiri Rice", category: "D63 Sushi/Sashimi", barcode: "811481021145" },
  { id: "10581", name: "Deli Salmon - ABF", category: "Dept 61 Meat", barcode: "", plu: "1621" },
  { id: "15996", name: "Beef Flank Steak - Deli", category: "Dept 61 Meat", barcode: "", plu: "268" },
  { id: "17708", name: "Beef Fine Grind - Deli", category: "Dept 61 Meat", barcode: "", plu: "291" },
  { id: "31462", name: "Pork Tenderloin - Deli", category: "Dept 61 Meat", barcode: "", plu: "241" },
  { id: "34200", name: "Rack of Pork - Deli", category: "Dept 61 Meat", barcode: "", plu: "461" },
  { id: "36241", name: "Choice Beef GL Ribs - Deli", category: "Dept 61 Meat", barcode: "", plu: "532" },
  { id: "38297", name: "Beef Tri Tip - Deli", category: "Dept 61 Meat", barcode: "", plu: "644" },
  { id: "38366", name: "Beef Flap Meat - Deli", category: "Dept 61 Meat", barcode: "", plu: "602" },
  { id: "43600", name: "St Louis Ribs - Deli", category: "Dept 61 Meat", barcode: "", plu: "1612" },
  { id: "44011", name: "Pork Back Rib - Deli", category: "Dept 61 Meat", barcode: "", plu: "1720" },
  { id: "44587", name: "Lamb Leg - Deli", category: "Dept 61 Meat", barcode: "", plu: "3177" },
  { id: "50615", name: "Sliced Roast Beef", category: "Random Weight", barcode: "", plu: "5615", randomWeight: true },
  { id: "10078", name: "Sliced Chicken", category: "Random Weight", barcode: "", plu: "1008", randomWeight: true },
  { id: "32579", name: "Sous Vide St Louis Ribs", category: "Random Weight", barcode: "", plu: "3279", randomWeight: true },
  { id: "10886", name: "Sous Vide Pork Backribs", category: "Random Weight", barcode: "", plu: "1886", randomWeight: true },
  { id: "1474473", name: "9L Foam Tray", category: "Trays", barcode: "738392759250" },
  { id: "1590027", name: "15P PET Tray 231 CS", category: "Trays", barcode: "893602601818" },
  { id: "1478601", name: "25/15 White 200 CT", category: "Trays", barcode: "738392204873" },
  { id: "1473858", name: "8 White Foam Tray", category: "Trays", barcode: "738392723763" },
  { id: "12011", name: "Absorbent Pads", category: "Trays", barcode: "040036694521" },
];

const CATEGORIES = [...new Set(ALL_ITEMS.map(i => i.category))];
const API = "/api";

function ls(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } }
function sv(k, val) { try { localStorage.setItem(k, JSON.stringify(val)); } catch {} }

// ── REAL CODE 128 BARCODE ENCODER ────────────────────────────────────────────
// Code 128B character set (space=0 through DEL=94, indices match ASCII-32)
const CODE128_PATTERNS = [
  "11011001100","11001101100","11001100110","10010011000","10010001100",
  "10001001100","10011001000","10011000100","10001100100","11001001000",
  "11001000100","11000100100","10110011100","10011011100","10011001110",
  "10111001100","10011101100","10011100110","11001110010","11001011100",
  "11001001110","11011100100","11001110100","11101101110","11101001100",
  "11100101100","11100100110","11101100100","11100110100","11100110010",
  "11011011000","11011000110","11000110110","10100011000","10001011000",
  "10001000110","10110001000","10001101000","10001100010","11010001000",
  "11000101000","11000100010","10110111000","10110001110","10001101110",
  "10111011000","10111000110","10001110110","11101110110","11010001110",
  "11000101110","11011101000","11011100010","11011101110","11101011000",
  "11101000110","11100010110","11101101000","11101100010","11100011010",
  "11101111010","11001000010","11110001010","10100110000","10100001100",
  "10010110000","10010000110","10000101100","10000100110","10110010000",
  "10110000100","10011010000","10011000010","10000110100","10000110010",
  "11000010010","11001010000","11110111010","11000010100","10001111010",
  "10100111100","10010111100","10010011110","10111100100","10011110100",
  "10011110010","11110100100","11110010100","11110010010","11011011110",
  "11011110110","11110110110","10101111000","10100011110","10001011110",
  "10111101000","10111100010","11110101000","11110100010","10111011110",
  "10111101110","11101011110","11110101110","11010000100","11010010000",
  "11010011100","1100011101011"  // Stop pattern (index 103 = Start B, 106 = Stop)
];
// Remap: index 0..102 = value chars, 103=StartB, 104=Stop
// Actually standard mapping: StartB=104, Stop=106
const C128_START_B = "11010010000";
const C128_STOP    = "1100011101011";

function encodeCode128(text) {
  if (!text) return [];
  // Build bar pattern string
  let bits = C128_START_B;
  let checksum = 104; // Start B value
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) - 32; // Code B: ASCII - 32
    if (code < 0 || code > 95) continue;
    bits += CODE128_PATTERNS[code];
    checksum += (i + 1) * code;
  }
  // Checksum symbol
  const checkCode = checksum % 103;
  bits += CODE128_PATTERNS[checkCode];
  bits += C128_STOP;

  // Convert bit string to bar widths [{w, black}]
  const bars = [];
  let i = 0;
  while (i < bits.length) {
    const ch = bits[i];
    let w = 0;
    while (i < bits.length && bits[i] === ch) { w++; i++; }
    bars.push({ w, black: ch === "1" });
  }
  return bars;
}

function Barcode({ value, label }) {
  const bars = useMemo(() => encodeCode128(value), [value]);
  const totalW = bars.reduce((s, b) => s + b.w, 0);
  if (!bars.length) return (
    <div style={{ textAlign: "center", padding: 16, color: "#999", fontSize: 13 }}>No barcode available</div>
  );
  return (
    <div style={{ textAlign: "center", padding: "12px 0" }}>
      <svg
        viewBox={`0 0 ${totalW} 60`}
        preserveAspectRatio="none"
        style={{ width: "100%", maxWidth: 320, height: 80, display: "block", margin: "0 auto" }}
      >
        {(() => {
          let x = 0;
          return bars.map((b, i) => {
            const rect = b.black ? (
              <rect key={i} x={x} y={0} width={b.w} height={60} fill="#000" />
            ) : null;
            x += b.w;
            return rect;
          });
        })()}
      </svg>
      <div style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: 1.5, color: "#333", marginTop: 4 }}>{value}</div>
      {label && <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{label}</div>}
    </div>
  );
}

// ── BARCODE MODAL (used in history) ──────────────────────────────────────────
function BarcodeModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 18, padding: 24, width: "100%", maxWidth: 380, boxShadow: "0 8px 32px rgba(0,0,0,.3)" }} onClick={e => e.stopPropagation()}>
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <span style={{ background: "#003087", color: "#fff", borderRadius: 6, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>{item.category}</span>
        </div>
        <h2 style={{ textAlign: "center", color: "#1a1a2e", fontSize: 17, margin: "8px 0 2px" }}>{item.name}</h2>
        <div style={{ textAlign: "center", color: "#888", fontSize: 11, marginBottom: 14 }}>Item #{item.id}</div>
        {item.plu && (
          <div style={{ background: "#e8f0fe", borderRadius: 8, padding: "8px 14px", textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 10, color: "#003087", fontWeight: 700 }}>PLU NUMBER</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#003087", letterSpacing: 4 }}>{item.plu}</div>
          </div>
        )}
        {item.barcode
          ? <Barcode value={item.barcode} label={`Item #${item.id}`} />
          : <div style={{ textAlign: "center", padding: 14, color: "#888", background: "#f5f5f5", borderRadius: 8, fontSize: 13 }}>No barcode — use PLU or item number</div>
        }
        <button onClick={onClose} style={{ width: "100%", marginTop: 16, background: "#003087", color: "#fff", border: "none", borderRadius: 10, padding: "11px 0", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Close</button>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
function App() {
  const [userName, setUserName] = useState(() => ls("deli_username", ""));
  const [nameInput, setNameInput] = useState("");

  const [adminKey, setAdminKey] = useState(() => ls("deli_adminkey", ""));
  const [isAdmin, setIsAdmin] = useState(() => !!ls("deli_adminkey", ""));
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  // Cart persisted to localStorage
  const [cart, setCartRaw] = useState(() => ls("deli_cart", []));
  const [weights, setWeightsRaw] = useState(() => ls("deli_weights", {}));
  const [prices, setPricesRaw] = useState(() => ls("deli_prices", {}));

  const setCart = (fn) => setCartRaw(prev => {
    const next = typeof fn === "function" ? fn(prev) : fn;
    sv("deli_cart", next);
    return next;
  });
  const setWeights = (fn) => setWeightsRaw(prev => {
    const next = typeof fn === "function" ? fn(prev) : fn;
    sv("deli_weights", next);
    return next;
  });
  const setPrices = (fn) => setPricesRaw(prev => {
    const next = typeof fn === "function" ? fn(prev) : fn;
    sv("deli_prices", next);
    return next;
  });

  const [view, setView] = useState("shop");
  const [barcodeItem, setBarcodeItem] = useState(null);

  const [receipts, setReceipts] = useState([]);
  const [disabled, setDisabled] = useState([]);
  const [loadingReceipts, setLoadingReceipts] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const [sCat, setSCat] = useState("All");
  const [sSearch, setSSearch] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [confirmDone, setConfirmDone] = useState(false);
  const [wModal, setWModal] = useState(null);
  const [mW, setMW] = useState("");
  const [mP, setMP] = useState("");

  // Barcode modal for history items
  const [historyBarcodeItem, setHistoryBarcodeItem] = useState(null);

  useEffect(() => {
    if (!userName) return;
    fetchReceipts();
    fetchDisabled();
  }, [userName]);

  const fetchReceipts = async () => {
    setLoadingReceipts(true);
    try {
      const r = await fetch(`${API}/orders`);
      const data = await r.json();
      setReceipts(Array.isArray(data) ? data : []);
    } catch (e) {}
    setLoadingReceipts(false);
  };

  const fetchDisabled = async () => {
    try {
      const r = await fetch(`${API}/disabled-items`);
      const data = await r.json();
      setDisabled(data.disabled || []);
    } catch (e) {}
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const active = useMemo(() => ALL_ITEMS.filter(i => !disabled.includes(i.id)), [disabled]);

  const shopItems = useMemo(() => {
    const q = search.toLowerCase();
    return active.filter(i => (cat === "All" || i.category === cat) && (!q || i.name.toLowerCase().includes(q) || i.id.includes(q)));
  }, [search, cat, active]);

  const settingsItems = useMemo(() => {
    const q = sSearch.toLowerCase();
    return ALL_ITEMS.filter(i => (sCat === "All" || i.category === sCat) && (!q || i.name.toLowerCase().includes(q) || i.id.includes(q)));
  }, [sSearch, sCat]);

  const saveName = () => {
    const n = nameInput.trim();
    if (!n) return;
    setUserName(n);
    sv("deli_username", n);
  };

  const adminLogin = async () => {
    setAdminLoading(true);
    setAdminError("");
    try {
      const r = await fetch(`${API}/admin-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: adminUser, password: adminPass }),
      });
      const data = await r.json();
      if (data.success) {
        setIsAdmin(true);
        setAdminKey(data.adminKey);
        sv("deli_adminkey", data.adminKey);
        setAdminUser(""); setAdminPass("");
      } else {
        setAdminError("Invalid username or password");
      }
    } catch { setAdminError("Connection error — try again"); }
    setAdminLoading(false);
  };

  const adminLogout = () => {
    setIsAdmin(false);
    setAdminKey("");
    sv("deli_adminkey", "");
  };

  const addToCart = (item) => {
    if (item.randomWeight) { setWModal(item); setMW(""); setMP(""); return; }
    setCart(p => {
      const e = p.find(c => c.id === item.id);
      return e ? p.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c) : [...p, { ...item, qty: 1 }];
    });
  };

  const subtractFromCart = (item) => {
    setCart(p => {
      const e = p.find(c => c.id === item.id);
      if (!e) return p;
      if (e.qty <= 1) return p.filter(c => c.id !== item.id);
      return p.map(c => c.id === item.id ? { ...c, qty: c.qty - 1 } : c);
    });
  };

  const confirmWModal = () => {
    if (!wModal || !mW) return;
    setWeights(p => ({ ...p, [wModal.id]: mW }));
    if (mP) setPrices(p => ({ ...p, [wModal.id]: mP }));
    setCart(p => {
      const e = p.find(c => c.id === wModal.id);
      return e ? p.map(c => c.id === wModal.id ? { ...c, qty: c.qty + 1 } : c) : [...p, { ...wModal, qty: 1 }];
    });
    setWModal(null);
  };

  const removeFromCart = id => {
    setCart(p => p.filter(c => c.id !== id));
    setWeights(p => { const n = { ...p }; delete n[id]; return n; });
    setPrices(p => { const n = { ...p }; delete n[id]; return n; });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) { removeFromCart(id); return; }
    setCart(p => p.map(c => c.id === id ? { ...c, qty } : c));
  };

  const completeOrder = async () => {
    setSyncing(true);
    try {
      const items = cart.map(i => ({ ...i, weight: weights[i.id] || null, pricePerLb: prices[i.id] || null }));
      const r = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, items, totalItems: cartCount }),
      });
      if (r.ok) {
        setCart([]);
        setWeights({});
        setPrices({});
        sv("deli_cart", []);
        sv("deli_weights", {});
        sv("deli_prices", {});
        setConfirmDone(false);
        await fetchReceipts();
        setView("history");
      }
    } catch (e) { alert("Error saving order — check your connection"); }
    setSyncing(false);
  };

  const deleteOrder = async (id) => {
    if (!isAdmin) return;
    try {
      await fetch(`${API}/orders`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, adminKey }),
      });
      setReceipts(p => p.filter(r => r.id !== id));
    } catch (e) { alert("Error deleting order"); }
  };

  const toggleDisabled = async (itemId) => {
    if (!isAdmin) return;
    const newDisabled = disabled.includes(itemId) ? disabled.filter(x => x !== itemId) : [...disabled, itemId];
    setDisabled(newDisabled);
    try {
      await fetch(`${API}/disabled-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disabled: newDisabled, adminKey }),
      });
    } catch (e) {}
  };

  const reenableAll = async () => {
    setDisabled([]);
    try {
      await fetch(`${API}/disabled-items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disabled: [], adminKey }),
      });
    } catch (e) {}
  };

  const av = view === "barcode" ? "checkout" : view;
  const iStyle = { width: "100%", padding: "11px 14px", borderRadius: 10, border: "2px solid #dde", fontSize: 15, outline: "none", boxSizing: "border-box" };
  const Chip = (label, on, fn) => (
    <button onClick={fn} style={{ padding: "5px 11px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, background: on ? "#003087" : "#e8eaf0", color: on ? "#fff" : "#555", whiteSpace: "nowrap" }}>{label}</button>
  );

  // ── NAME SCREEN ──────────────────────────────────────────────────────────────
  if (!userName) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#003087,#0055b3)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 360, boxShadow: "0 12px 40px rgba(0,0,0,.25)", textAlign: "center" }}>
          <div style={{ background: "#e31837", borderRadius: 10, padding: "6px 18px", fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: 1, display: "inline-block", marginBottom: 16 }}>COSTCO</div>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Service Deli · Supply Worksheet</div>
          <h2 style={{ fontSize: 18, color: "#1a1a2e", marginBottom: 8 }}>Welcome! What's your name?</h2>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Your name is saved on this device so your orders are tracked.</p>
          <input autoFocus value={nameInput} onChange={e => setNameInput(e.target.value)} onKeyDown={e => e.key === "Enter" && saveName()} placeholder="Enter your first name…" style={{ ...iStyle, marginBottom: 14, fontSize: 16, textAlign: "center" }} />
          <button onClick={saveName} disabled={!nameInput.trim()} style={{ width: "100%", background: nameInput.trim() ? "#003087" : "#ccc", color: "#fff", border: "none", borderRadius: 10, padding: "13px 0", fontWeight: 700, fontSize: 16, cursor: nameInput.trim() ? "pointer" : "not-allowed" }}>Get Started</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5" }} className="safe-bottom">

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#003087,#0055b3)", padding: "0 16px", paddingTop: "env(safe-area-inset-top)", boxShadow: "0 2px 10px rgba(0,0,0,.2)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ background: "#e31837", borderRadius: 6, padding: "3px 9px", fontWeight: 900, fontSize: 16, color: "#fff", letterSpacing: 1 }}>COSTCO</span>
            <span style={{ color: "rgba(255,255,255,.8)", fontSize: 12 }}>Hey, {userName}!</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isAdmin && <span style={{ background: "#e31837", color: "#fff", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>ADMIN</span>}
            {cartCount > 0 && <span style={{ background: "#e31837", color: "#fff", borderRadius: 20, padding: "2px 11px", fontSize: 12, fontWeight: 700 }}>{cartCount} in cart</span>}
          </div>
        </div>
      </div>

      {/* ── SHOP ── */}
      {view === "shop" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 14 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or item #…" style={iStyle} />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "10px 0 12px" }}>
            {["All", ...CATEGORIES].map(c => Chip(c, cat === c, () => setCat(c)))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 9 }}>
            {shopItems.map(item => {
              const inCart = cart.find(c => c.id === item.id);
              const qty = inCart ? inCart.qty : 0;
              return (
                <div key={item.id} style={{ background: "#fff", borderRadius: 11, padding: "13px 14px", boxShadow: "0 1px 5px rgba(0,0,0,.07)", border: inCart ? "2px solid #003087" : "2px solid transparent" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: inCart ? 8 : 0 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>
                        #{item.id} · <span style={{ color: "#003087" }}>{item.category}</span>
                        {item.randomWeight && <span style={{ background: "#fff3cd", color: "#856404", borderRadius: 4, padding: "0 5px", marginLeft: 4, fontSize: 9, fontWeight: 700 }}>SCALE</span>}
                        {item.plu && <span style={{ background: "#e8f0fe", color: "#003087", borderRadius: 4, padding: "0 5px", marginLeft: 4, fontSize: 9, fontWeight: 700 }}>PLU {item.plu}</span>}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3 }}>{item.name}</div>
                    </div>
                    {/* If not in cart: single + button. If in cart: −  qty  + */}
                    {!inCart ? (
                      <button onClick={() => addToCart(item)} style={{ background: "#e31837", color: "#fff", border: "none", borderRadius: 8, width: 30, height: 30, fontSize: 19, cursor: "pointer", flexShrink: 0, marginLeft: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8, flexShrink: 0 }}>
                        <button onClick={() => subtractFromCart(item)} style={{ width: 28, height: 28, borderRadius: 7, border: "none", background: "#f0f4ff", color: "#003087", cursor: "pointer", fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                        <span style={{ fontWeight: 800, fontSize: 15, minWidth: 20, textAlign: "center", color: "#003087" }}>{qty}</span>
                        <button onClick={() => addToCart(item)} style={{ width: 28, height: 28, borderRadius: 7, border: "none", background: "#003087", color: "#fff", cursor: "pointer", fontSize: 17, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {shopItems.length === 0 && <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40, color: "#aaa" }}>No items found</div>}
          </div>
        </div>
      )}

      {/* ── CART ── */}
      {view === "checkout" && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h2 style={{ margin: 0, color: "#003087", fontSize: 19 }}>🛒 Cart ({cartCount})</h2>
            {cart.length > 0 && <button onClick={() => setConfirmDone(true)} style={{ background: "#18a558", color: "#fff", border: "none", borderRadius: 9, padding: "9px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>✅ Complete Order</button>}
          </div>
          {confirmDone && (
            <div style={{ background: "#fff", border: "2px solid #18a558", borderRadius: 12, padding: 18, marginBottom: 14, boxShadow: "0 4px 18px rgba(0,0,0,.1)" }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Complete this order?</div>
              <div style={{ fontSize: 13, color: "#555", marginBottom: 12 }}>This will be saved to shared history as <strong>{userName}</strong>.</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={completeOrder} disabled={syncing} style={{ flex: 1, background: "#18a558", color: "#fff", border: "none", borderRadius: 8, padding: "9px 0", fontWeight: 700, cursor: "pointer" }}>{syncing ? "Saving…" : "Yes, Submit Order"}</button>
                <button onClick={() => setConfirmDone(false)} style={{ flex: 1, background: "#eee", color: "#333", border: "none", borderRadius: 8, padding: "9px 0", fontWeight: 700, cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          )}
          {cart.length === 0 && <div style={{ background: "#fff", borderRadius: 12, padding: 40, textAlign: "center", color: "#aaa" }}>Cart is empty — add items from the Shop.</div>}
          {cart.map(item => {
            const w = parseFloat(weights[item.id] || 0), p = parseFloat(prices[item.id] || 0);
            const tot = w && p ? (w * p).toFixed(2) : null;
            return (
              <div key={item.id} style={{ background: "#fff", borderRadius: 11, padding: "13px 14px", boxShadow: "0 1px 5px rgba(0,0,0,.07)", marginBottom: 9 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 9 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "#888" }}>#{item.id} · {item.category}{item.randomWeight ? " · ⚖️ SCALE" : ""}{item.plu ? ` · PLU ${item.plu}` : ""}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{item.name}</div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: "#fee", color: "#e31837", border: "none", borderRadius: 7, padding: "4px 9px", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>Remove</button>
                </div>
                {!item.randomWeight && (
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
                    <span style={{ fontSize: 12, color: "#555", fontWeight: 600 }}>Qty:</span>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 27, height: 27, borderRadius: 6, border: "1px solid #ddd", background: "#f5f5f5", cursor: "pointer", fontSize: 15 }}>−</button>
                    <span style={{ fontWeight: 700, fontSize: 15, minWidth: 22, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 27, height: 27, borderRadius: 6, border: "1px solid #ddd", background: "#f5f5f5", cursor: "pointer", fontSize: 15 }}>+</button>
                  </div>
                )}
                {item.randomWeight && (
                  <div style={{ background: "#fffbf0", borderRadius: 8, padding: 11, marginBottom: 9, border: "1px solid #ffe" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#856404", marginBottom: 7 }}>⚖️ Scale Item</div>
                    <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                      <div><label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 3 }}>Weight (lbs)</label>
                        <input type="number" min="0" step="0.01" value={weights[item.id] || ""} onChange={e => setWeights(pr => ({ ...pr, [item.id]: e.target.value }))} placeholder="1.25" style={{ width: 95, padding: "6px 9px", borderRadius: 6, border: "1px solid #ccc", fontSize: 13 }} /></div>
                      <div><label style={{ fontSize: 11, color: "#555", display: "block", marginBottom: 3 }}>Price/lb ($)</label>
                        <input type="number" min="0" step="0.01" value={prices[item.id] || ""} onChange={e => setPrices(pr => ({ ...pr, [item.id]: e.target.value }))} placeholder="8.99" style={{ width: 95, padding: "6px 9px", borderRadius: 6, border: "1px solid #ccc", fontSize: 13 }} /></div>
                    </div>
                    {tot && <div style={{ marginTop: 9, padding: "8px 12px", background: "#003087", color: "#fff", borderRadius: 8, fontWeight: 700 }}>💰 Enter at register: <span style={{ fontSize: 17 }}>${tot}</span></div>}
                  </div>
                )}
                <button onClick={() => { setBarcodeItem(item); setView("barcode"); }} style={{ background: "#003087", color: "#fff", border: "none", borderRadius: 8, padding: "8px 0", width: "100%", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>📊 Show Barcode</button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── BARCODE ── */}
      {view === "barcode" && barcodeItem && (
        <div style={{ maxWidth: 500, margin: "0 auto", padding: 14 }}>
          <button onClick={() => setView("checkout")} style={{ background: "transparent", border: "none", color: "#003087", cursor: "pointer", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>← Back to Cart</button>
          <div style={{ background: "#fff", borderRadius: 16, padding: 22, boxShadow: "0 4px 18px rgba(0,0,0,.1)" }}>
            <div style={{ textAlign: "center", marginBottom: 7 }}>
              <span style={{ background: "#003087", color: "#fff", borderRadius: 6, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>{barcodeItem.category}</span>
            </div>
            <h2 style={{ textAlign: "center", color: "#1a1a2e", fontSize: 19, margin: "7px 0 3px" }}>{barcodeItem.name}</h2>
            <div style={{ textAlign: "center", color: "#888", fontSize: 12, marginBottom: 14 }}>Item #{barcodeItem.id}</div>
            {barcodeItem.plu && (
              <div style={{ background: "#e8f0fe", borderRadius: 8, padding: "9px 14px", textAlign: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: "#003087", fontWeight: 600 }}>PLU NUMBER</div>
                <div style={{ fontSize: 34, fontWeight: 900, color: "#003087", letterSpacing: 4 }}>{barcodeItem.plu}</div>
              </div>
            )}
            {barcodeItem.barcode
              ? <Barcode value={barcodeItem.barcode} label={`Item #${barcodeItem.id}`} />
              : <div style={{ textAlign: "center", padding: 18, color: "#888", background: "#f5f5f5", borderRadius: 8 }}>No barcode — use PLU or item number</div>
            }
            {barcodeItem.randomWeight && weights[barcodeItem.id] && prices[barcodeItem.id] && (
              <div style={{ background: "#fff3cd", borderRadius: 8, padding: 11, marginTop: 12, border: "1px solid #ffe" }}>
                <div style={{ fontWeight: 700, color: "#003087", fontSize: 15 }}>Register amount: ${(parseFloat(weights[barcodeItem.id]) * parseFloat(prices[barcodeItem.id])).toFixed(2)}</div>
              </div>
            )}
            {(() => { const e = cart.find(c => c.id === barcodeItem.id); return e ? <div style={{ marginTop: 12, background: "#f0f4ff", borderRadius: 8, padding: "9px 14px", textAlign: "center", fontWeight: 700, color: "#003087", fontSize: 13 }}>Quantity on order: {e.qty}</div> : null; })()}
            <div style={{ display: "flex", gap: 5, marginTop: 12, flexWrap: "wrap" }}>
              {cart.map((item, idx) => (
                <button key={item.id} onClick={() => setBarcodeItem(item)} style={{ flex: "1 1 auto", minWidth: 55, padding: "5px 3px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 600, background: item.id === barcodeItem.id ? "#003087" : "#e8eaf0", color: item.id === barcodeItem.id ? "#fff" : "#444", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {idx + 1}. {item.name.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── HISTORY ── */}
      {view === "history" && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h2 style={{ margin: 0, color: "#003087", fontSize: 19 }}>📋 Order History</h2>
            <button onClick={fetchReceipts} style={{ background: "#e8f0fe", color: "#003087", border: "none", borderRadius: 8, padding: "6px 13px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>↻ Refresh</button>
          </div>
          {loadingReceipts && <div style={{ textAlign: "center", padding: 40, color: "#888" }}>Loading…</div>}
          {!loadingReceipts && receipts.length === 0 && <div style={{ background: "#fff", borderRadius: 12, padding: 40, textAlign: "center", color: "#aaa" }}>No orders yet.</div>}
          {receipts.map(receipt => {
            const date = new Date(receipt.created_at);
            const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            const timeStr = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
            return (
              <div key={receipt.id} style={{ background: "#fff", borderRadius: 11, padding: "14px 16px", boxShadow: "0 1px 5px rgba(0,0,0,.07)", marginBottom: 9, border: expanded === receipt.id ? "2px solid #003087" : "2px solid transparent" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ background: "#003087", color: "#fff", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{receipt.user_name}</span>
                      <span style={{ fontSize: 11, color: "#888" }}>{receipt.total_items} item{receipt.total_items !== 1 ? "s" : ""}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>📅 {dateStr} · 🕐 {timeStr}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0, marginLeft: 8 }}>
                    <button onClick={() => setExpanded(expanded === receipt.id ? null : receipt.id)} style={{ background: "#e8f0fe", color: "#003087", border: "none", borderRadius: 8, padding: "6px 13px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>{expanded === receipt.id ? "Hide" : "View"}</button>
                    {isAdmin && <button onClick={() => deleteOrder(receipt.id)} style={{ background: "#fee", color: "#e31837", border: "none", borderRadius: 8, padding: "6px 11px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>🗑</button>}
                  </div>
                </div>
                {expanded === receipt.id && (
                  <div style={{ marginTop: 12, borderTop: "1px solid #f0f0f0", paddingTop: 11 }}>
                    {(receipt.items || []).map((item, ii) => {
                      const fullItem = ALL_ITEMS.find(a => a.id === item.id) || item;
                      return (
                        <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: "#f8f9fb", borderRadius: 8, padding: "9px 11px", marginBottom: 6 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 12, color: "#1a1a2e" }}>{item.name}</div>
                            <div style={{ fontSize: 10, color: "#888" }}>#{item.id}{item.plu ? ` · PLU ${item.plu}` : ""}{item.randomWeight ? " · ⚖️ Scale" : ""}</div>
                            {item.randomWeight && item.weight && item.pricePerLb && (
                              <div style={{ fontSize: 11, color: "#003087", fontWeight: 600, marginTop: 2 }}>{item.weight} lbs × ${item.pricePerLb}/lb = ${(parseFloat(item.weight) * parseFloat(item.pricePerLb)).toFixed(2)}</div>
                            )}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, marginLeft: 8 }}>
                            <span style={{ background: "#003087", color: "#fff", borderRadius: 6, padding: "3px 9px", fontSize: 11, fontWeight: 700 }}>{item.qty}×</span>
                            {(fullItem.barcode || fullItem.plu) && (
                              <button onClick={() => setHistoryBarcodeItem(fullItem)} style={{ background: "#e8f0fe", color: "#003087", border: "none", borderRadius: 6, padding: "4px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>📊</button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── SETTINGS ── */}
      {view === "settings" && (
        <div style={{ maxWidth: 700, margin: "0 auto", padding: 14 }}>
          <div style={{ background: isAdmin ? "#f0fff4" : "#fff", borderRadius: 12, padding: 18, marginBottom: 16, border: isAdmin ? "2px solid #18a558" : "1px solid #eee", boxShadow: "0 1px 5px rgba(0,0,0,.07)" }}>
            {isAdmin ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#18a558" }}>✅ Admin Mode Active</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>You can disable items and delete orders.</div>
                </div>
                <button onClick={adminLogout} style={{ background: "#fee", color: "#e31837", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Log Out</button>
              </div>
            ) : (
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 12 }}>🔐 Admin Login</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <input value={adminUser} onChange={e => setAdminUser(e.target.value)} placeholder="Username" style={{ ...iStyle, fontSize: 14 }} />
                  <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} onKeyDown={e => e.key === "Enter" && adminLogin()} placeholder="Password" style={{ ...iStyle, fontSize: 14 }} />
                  {adminError && <div style={{ color: "#e31837", fontSize: 12, fontWeight: 600 }}>{adminError}</div>}
                  <button onClick={adminLogin} disabled={adminLoading} style={{ background: "#003087", color: "#fff", border: "none", borderRadius: 9, padding: "10px 0", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>{adminLoading ? "Logging in…" : "Log In"}</button>
                </div>
              </div>
            )}
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: "12px 16px", marginBottom: 16, border: "1px solid #eee", boxShadow: "0 1px 5px rgba(0,0,0,.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: "#888" }}>Logged in as</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>{userName}</div>
            </div>
            <button onClick={() => { setUserName(""); sv("deli_username", ""); }} style={{ background: "#eee", color: "#555", border: "none", borderRadius: 8, padding: "6px 12px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Change Name</button>
          </div>
          {isAdmin ? (
            <>
              <h3 style={{ color: "#003087", fontSize: 15, marginBottom: 10 }}>⚙️ Manage Items</h3>
              <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>Toggle items off to hide them from all users.{disabled.length > 0 && <strong style={{ color: "#e31837" }}> {disabled.length} hidden.</strong>}</p>
              <input value={sSearch} onChange={e => setSSearch(e.target.value)} placeholder="Search items…" style={{ ...iStyle, marginBottom: 9 }} />
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 11 }}>
                {["All", ...CATEGORIES].map(c => Chip(c, sCat === c, () => setSCat(c)))}
              </div>
              {disabled.length > 0 && <button onClick={reenableAll} style={{ width: "100%", background: "#e8f0fe", color: "#003087", border: "none", borderRadius: 9, padding: "9px 0", fontWeight: 700, fontSize: 13, cursor: "pointer", marginBottom: 10 }}>✓ Re-enable all {disabled.length} hidden items</button>}
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {settingsItems.map(item => {
                  const off = disabled.includes(item.id);
                  return (
                    <div key={item.id} onClick={() => toggleDisabled(item.id)} style={{ background: "#fff", borderRadius: 10, padding: "11px 13px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", opacity: off ? 0.45 : 1, border: "1px solid #eef", boxShadow: "0 1px 4px rgba(0,0,0,.04)", userSelect: "none" }}>
                      <div>
                        <div style={{ fontSize: 10, color: "#888" }}>#{item.id} · {item.category}</div>
                        <div style={{ fontWeight: 600, fontSize: 13, color: off ? "#bbb" : "#1a1a2e" }}>{item.name}</div>
                      </div>
                      <div style={{ flexShrink: 0, marginLeft: 10, width: 42, height: 23, borderRadius: 12, background: off ? "#ccc" : "#003087", position: "relative", transition: "background .2s" }}>
                        <div style={{ position: "absolute", top: 2.5, left: off ? 2 : 21, width: 18, height: 18, borderRadius: 9, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.25)", transition: "left .2s" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, textAlign: "center", color: "#aaa", border: "1px solid #eee" }}>🔐 Log in as Admin to manage items</div>
          )}
        </div>
      )}

      {/* WEIGHT MODAL */}
      {wModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, width: "100%", maxWidth: 360, boxShadow: "0 8px 32px rgba(0,0,0,.25)" }}>
            <div style={{ textAlign: "center", marginBottom: 4 }}>
              <span style={{ background: "#fff3cd", color: "#856404", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>⚖️ SCALE ITEM</span>
            </div>
            <h3 style={{ textAlign: "center", margin: "10px 0 4px", fontSize: 16, color: "#1a1a2e" }}>{wModal.name}</h3>
            <p style={{ textAlign: "center", fontSize: 12, color: "#888", margin: "0 0 18px" }}>Item #{wModal.id}{wModal.plu ? ` · PLU ${wModal.plu}` : ""}</p>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#333", marginBottom: 5 }}>Weight (lbs) <span style={{ color: "#e31837" }}>*</span></label>
              <input autoFocus type="number" min="0" step="0.01" value={mW} onChange={e => setMW(e.target.value)} onKeyDown={e => e.key === "Enter" && confirmWModal()} placeholder="e.g. 1.25" style={{ width: "100%", padding: "11px 13px", borderRadius: 9, border: mW ? "2px solid #003087" : "2px solid #ddd", fontSize: 16, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#333", marginBottom: 5 }}>Price per lb ($) <span style={{ fontSize: 11, color: "#888", fontWeight: 400 }}>optional</span></label>
              <input type="number" min="0" step="0.01" value={mP} onChange={e => setMP(e.target.value)} onKeyDown={e => e.key === "Enter" && confirmWModal()} placeholder="e.g. 8.99" style={{ width: "100%", padding: "11px 13px", borderRadius: 9, border: "2px solid #ddd", fontSize: 16, outline: "none", boxSizing: "border-box" }} />
              {mW && mP && <div style={{ marginTop: 8, background: "#003087", color: "#fff", borderRadius: 8, padding: "8px 12px", fontWeight: 700, textAlign: "center" }}>Register amount: ${(parseFloat(mW) * parseFloat(mP)).toFixed(2)}</div>}
            </div>
            <div style={{ display: "flex", gap: 9 }}>
              <button onClick={() => setWModal(null)} style={{ flex: 1, background: "#eee", color: "#333", border: "none", borderRadius: 9, padding: "11px 0", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Cancel</button>
              <button onClick={confirmWModal} disabled={!mW} style={{ flex: 2, background: mW ? "#003087" : "#ccc", color: "#fff", border: "none", borderRadius: 9, padding: "11px 0", fontWeight: 700, fontSize: 14, cursor: mW ? "pointer" : "not-allowed" }}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}

      {/* HISTORY BARCODE MODAL */}
      <BarcodeModal item={historyBarcodeItem} onClose={() => setHistoryBarcodeItem(null)} />

      {/* BOTTOM NAV */}
      <nav className="nav-bar" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #e0e0e0", display: "flex", zIndex: 100, boxShadow: "0 -2px 10px rgba(0,0,0,.07)" }}>
        {[{ key: "shop", icon: "🏪", label: "Shop" }, { key: "checkout", icon: "🛒", label: "Cart" }, { key: "history", icon: "📋", label: "History" }, { key: "settings", icon: "⚙️", label: "Settings" }].map(n => {
          const on = av === n.key;
          return (
            <button key={n.key} onClick={() => setView(n.key)} style={{ flex: 1, padding: "8px 4px 6px", border: "none", background: "transparent", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, color: on ? "#003087" : "#999", fontWeight: on ? 700 : 500, fontSize: 11, position: "relative" }}>
              <span style={{ fontSize: 19 }}>{n.icon}</span>
              <span>{n.label}</span>
              {n.key === "checkout" && cartCount > 0 && <span style={{ position: "absolute", top: 5, right: "calc(50% - 18px)", background: "#e31837", color: "#fff", borderRadius: 9, padding: "0 5px", fontSize: 9, fontWeight: 700 }}>{cartCount}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
