import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateWorkspace, useUpdateWorkspace, useWorkspace } from "@/hooks/use-database";

export default function CreateWorkspacePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [description, setDescription] = useState("");
  const [footer, setFooter] = useState("");
  const [image, setImage] = useState("");
  const [logo, setLogo] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const { data: existingWorkspace } = useWorkspace(Number(id), { enabled: isEditMode });
  const createMutation = useCreateWorkspace();
  const updateMutation = useUpdateWorkspace();

  useEffect(() => {
    if (existingWorkspace) {
      setName(existingWorkspace.name);
      setStatus(existingWorkspace.status || "active");
      setDescription(existingWorkspace.description || "");
      setFooter(existingWorkspace.footer || "");
      setImage(existingWorkspace.image || "");
      setLogo(existingWorkspace.logo || "");
    }
  }, [existingWorkspace]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      status,
      description,
      footer,
      image,
      logo,
    };

    try {
      if (isEditMode && id) {
        await updateMutation.mutateAsync({ id: Number(id), data });
      } else {
        await createMutation.mutateAsync(data);
      }
      navigate("/workspaces");
    } catch (error) {
      console.error("Failed to save workspace:", error);
    }
  };

  return (
    <DashboardLayout
      title="CREATE"
      breadcrumb={[
        { label: "Workspaces", path: "/workspaces" },
        { label: isEditMode ? "Edit" : "Create", path: "" },
      ]}
    >
      <div className="space-y-6">
        <Button
          onClick={() => navigate("/workspaces")}
          variant="default"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          BACK
        </Button>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                  </div>
                  {image && (
                    <div className="mt-2">
                      <img
                        src={image}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="cursor-pointer"
                    />
                  </div>
                  {logo && (
                    <div className="mt-2">
                      <img
                        src={logo}
                        alt="Logo Preview"
                        className="h-20 w-20 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Footer - Rich Text Editor */}
              <div className="space-y-2">
                <Label htmlFor="footer">Footer</Label>
                <div className="border rounded-md">
                  {/* Toolbar mockup to match the screenshot */}
                  <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1 text-sm">
                    <Select defaultValue="paragraph">
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paragraph">Paragraph</SelectItem>
                        <SelectItem value="heading1">Heading 1</SelectItem>
                        <SelectItem value="heading2">Heading 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-1 items-center">
                      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="font-bold">B</span>
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="italic">I</span>
                      </Button>
                      <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="underline">U</span>
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    id="footer"
                    placeholder="Footer"
                    value={footer}
                    onChange={(e) => setFooter(e.target.value)}
                    rows={10}
                    className="border-0 focus-visible:ring-0"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : "Save"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
