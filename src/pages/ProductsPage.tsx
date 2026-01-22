import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Package, Tag, Layers, IndianRupee } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  description: string;
}

const products: Product[] = [
  { id: "1", name: "Vacuum Pump VP-2000", sku: "VP-2000", category: "Vacuum Pumps", price: "₹2,50,000", stock: 15, status: "In Stock", description: "High-performance industrial vacuum pump" },
  { id: "2", name: "Industrial Blower IB-500", sku: "IB-500", category: "Blowers", price: "₹3,75,000", stock: 8, status: "In Stock", description: "Heavy-duty industrial blower system" },
  { id: "3", name: "Compressor Unit CU-100", sku: "CU-100", category: "Compressors", price: "₹1,85,000", stock: 3, status: "Low Stock", description: "Compact compressor for medium applications" },
  { id: "4", name: "Heat Exchanger HE-X200", sku: "HE-X200", category: "Heat Exchangers", price: "₹4,50,000", stock: 0, status: "Out of Stock", description: "Advanced heat exchange system" },
  { id: "5", name: "Filtration System FS-300", sku: "FS-300", category: "Filtration", price: "₹1,20,000", stock: 22, status: "In Stock", description: "Multi-stage filtration system" },
  { id: "6", name: "Control Panel CP-PRO", sku: "CP-PRO", category: "Controls", price: "₹75,000", stock: 5, status: "Low Stock", description: "Programmable control panel" },
];

const getStockColor = (status: Product["status"]) => {
  switch (status) {
    case "In Stock": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "Low Stock": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    default: return "bg-destructive/10 text-destructive border-destructive/20";
  }
};

const ProductsPage = () => {
  return (
    <DashboardLayout title="Products">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Products", value: "156", icon: Package, color: "from-primary to-primary/80" },
          { label: "Categories", value: "12", icon: Layers, color: "from-blue-500 to-blue-600" },
          { label: "Low Stock Items", value: "8", icon: Tag, color: "from-amber-500 to-amber-600" },
          { label: "Total Value", value: "₹4.2Cr", icon: IndianRupee, color: "from-emerald-500 to-emerald-600" },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-[0.06] group-hover:opacity-[0.12] transition-opacity`} />
            <CardContent className="p-5 relative flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Header */}
      <Card className="shadow-card mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-10" />
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card 
            key={product.id} 
            className="shadow-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in group overflow-hidden"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="h-32 bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center group-hover:from-primary/10 group-hover:to-primary/5 transition-all duration-300">
              <Package className="h-16 w-16 text-muted-foreground/30 group-hover:text-primary/40 group-hover:scale-110 transition-all duration-300" />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                </div>
                <Badge variant="outline" className={getStockColor(product.status)}>
                  {product.status}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-xl font-bold text-primary">{product.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Stock</p>
                  <p className="text-lg font-semibold">{product.stock} units</p>
                </div>
              </div>
              
              <div className="mt-3">
                <Badge variant="secondary" className="text-xs">{product.category}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ProductsPage;
