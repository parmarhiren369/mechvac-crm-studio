import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Package, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useProducts, useCreateProduct, useDeleteProduct } from "@/hooks/use-database";
import { toast } from "sonner";

const getStockColor = (status?: string) => {
  switch ((status || "").toLowerCase()) {
    case "in stock":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "low stock":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    default:
      return "bg-destructive/10 text-destructive border-destructive/20";
  }
};

const ProductsPage = () => {
  const { data: products, isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();

  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    cost: "",
    stock_quantity: "",
    unit: "",
    status: "in stock",
    description: "",
  });

  const filtered = (products ?? []).filter((p) => (p.name || "").toLowerCase().includes(search.toLowerCase()));

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    try {
      await createProduct.mutateAsync({
        name: formData.name.trim(),
        sku: formData.sku || undefined,
        category: formData.category || undefined,
        price: formData.price ? Number(formData.price) : undefined,
        cost: formData.cost ? Number(formData.cost) : undefined,
        stock_quantity: formData.stock_quantity ? Number(formData.stock_quantity) : undefined,
        unit: formData.unit || undefined,
        status: formData.status,
        description: formData.description || undefined,
      });
      toast.success("Product added");
      setIsCreateOpen(false);
      setFormData({ name: "", sku: "", category: "", price: "", cost: "", stock_quantity: "", unit: "", status: "in stock", description: "" });
    } catch (error: any) {
      toast.error(error?.message || "Failed to add product");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete product");
    }
  };

  return (
    <DashboardLayout title="Products">
      <Card className="shadow-card mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="pl-10" />
            </div>
            <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={() => setIsCreateOpen(true)}>
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={7} className="text-center py-6">Loading...</TableCell></TableRow>
              ) : filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-6">No products.</TableCell></TableRow>
              ) : (
                filtered.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku || "—"}</TableCell>
                    <TableCell>{product.category || "—"}</TableCell>
                    <TableCell>
                      {(product.price ?? 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                    </TableCell>
                    <TableCell>{product.stock_quantity ?? 0}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStockColor(product.status)}>
                        {product.status || "in stock"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>Create a product record.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Unit</Label>
              <Input value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Price</Label>
              <Input value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Cost</Label>
              <Input value={formData.cost} onChange={(e) => setFormData({ ...formData, cost: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Stock Quantity</Label>
              <Input value={formData.stock_quantity} onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Input value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Description</Label>
              <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate} disabled={createProduct.isPending}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ProductsPage;
