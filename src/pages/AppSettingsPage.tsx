import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCompanySettings, useUpdateCompanySettings } from "@/hooks/use-database";
import { Loader2 } from "lucide-react";

const AppSettingsPage = () => {
  const { data: settings, isLoading } = useCompanySettings();
  const updateSettings = useUpdateCompanySettings();

  const [formData, setFormData] = useState({
    name: "",
    about: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip_code: "",
    province_state: "",
    linkedin_url: "",
    twitter_url: "",
    facebook_url: "",
    instagram_url: "",
    company_logo_url: "",
    company_logo_small_url: "",
    company_icon_url: "",
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoSmallFile, setLogoSmallFile] = useState<File | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);

  useEffect(() => {
    if (settings) {
      setFormData({
        name: settings.name || "",
        about: settings.about || "",
        email: settings.email || "",
        phone: settings.phone || "",
        address: settings.address || "",
        city: settings.city || "",
        zip_code: settings.zip_code || "",
        province_state: settings.province_state || "",
        linkedin_url: settings.linkedin_url || "",
        twitter_url: settings.twitter_url || "",
        facebook_url: settings.facebook_url || "",
        instagram_url: settings.instagram_url || "",
        company_logo_url: settings.company_logo_url || "",
        company_logo_small_url: settings.company_logo_small_url || "",
        company_icon_url: settings.company_icon_url || "",
      });
    }
  }, [settings]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "logo_small" | "icon"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "logo") setLogoFile(file);
      else if (type === "logo_small") setLogoSmallFile(file);
      else setIconFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === "logo") {
          setFormData({ ...formData, company_logo_url: result });
        } else if (type === "logo_small") {
          setFormData({ ...formData, company_logo_small_url: result });
        } else {
          setFormData({ ...formData, company_icon_url: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync(formData);
      toast.success("Settings saved successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save settings");
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout
        title="App Settings"
        breadcrumb={[{ label: "Settings" }, { label: "General" }, { label: "App Settings" }]}
      >
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="App Settings"
      breadcrumb={[{ label: "Settings" }, { label: "General" }, { label: "App Settings" }]}
    >
      <div className="space-y-6">
        {/* Logo Upload Section */}
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Company Logo */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Company Logo</Label>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/30 overflow-hidden">
                    {formData.company_logo_url ? (
                      <img
                        src={formData.company_logo_url}
                        alt="Company Logo"
                        className="max-w-full max-h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">No logo uploaded</span>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "logo")}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Company Logo Small Square */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Company Logo Small Square</Label>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/30 overflow-hidden">
                    {formData.company_logo_small_url ? (
                      <img
                        src={formData.company_logo_small_url}
                        alt="Company Logo Small"
                        className="max-w-full max-h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">No logo uploaded</span>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "logo_small")}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Company Icon */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Company Icon</Label>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-full h-40 border-2 border-dashed rounded-lg flex items-center justify-center bg-muted/30 overflow-hidden">
                    {formData.company_icon_url ? (
                      <img
                        src={formData.company_icon_url}
                        alt="Company Icon"
                        className="max-w-full max-h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-sm text-muted-foreground">No icon uploaded</span>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "icon")}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Company Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@company.com"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="about">About (Short Desc)</Label>
                <Textarea
                  id="about"
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  placeholder="Short description about the company"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (234) 567-8900"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip_code">Zip Code</Label>
                <Input
                  id="zip_code"
                  value={formData.zip_code}
                  onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                  placeholder="12345"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="province_state">Province/State</Label>
                <Input
                  id="province_state"
                  value={formData.province_state}
                  onChange={(e) => setFormData({ ...formData, province_state: e.target.value })}
                  placeholder="State/Province"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/company/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter_url">Twitter URL</Label>
                <Input
                  id="twitter_url"
                  value={formData.twitter_url}
                  onChange={(e) => setFormData({ ...formData, twitter_url: e.target.value })}
                  placeholder="https://twitter.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input
                  id="facebook_url"
                  value={formData.facebook_url}
                  onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram_url">Instagram URL</Label>
                <Input
                  id="instagram_url"
                  value={formData.instagram_url}
                  onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={updateSettings.isPending}
            size="lg"
            className="px-8"
          >
            {updateSettings.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppSettingsPage;
