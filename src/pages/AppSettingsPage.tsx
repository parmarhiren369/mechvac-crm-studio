import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useCompanySettings, useUpdateCompanySettings } from "@/hooks/use-database";
import { toast } from "sonner";

export default function AppSettingsPage() {
  const { data: settings } = useCompanySettings();
  const updateMutation = useUpdateCompanySettings();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [provinceState, setProvinceState] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [companyLogoUrl, setCompanyLogoUrl] = useState("");
  const [companyLogoSmallUrl, setCompanyLogoSmallUrl] = useState("");
  const [companyIconUrl, setCompanyIconUrl] = useState("");

  useEffect(() => {
    if (settings) {
      setName(settings.name || "");
      setAbout(settings.about || "");
      setEmail(settings.email || "");
      setPhone(settings.phone || "");
      setAddress(settings.address || "");
      setCity(settings.city || "");
      setZipCode(settings.zip_code || "");
      setProvinceState(settings.province_state || "");
      setLinkedinUrl(settings.linkedin_url || "");
      setTwitterUrl(settings.twitter_url || "");
      setFacebookUrl(settings.facebook_url || "");
      setInstagramUrl(settings.instagram_url || "");
      setCompanyLogoUrl(settings.company_logo_url || "");
      setCompanyLogoSmallUrl(settings.company_logo_small_url || "");
      setCompanyIconUrl(settings.company_icon_url || "");
    }
  }, [settings]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'small' | 'icon') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'logo') setCompanyLogoUrl(result);
        else if (type === 'small') setCompanyLogoSmallUrl(result);
        else setCompanyIconUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      about,
      email,
      phone,
      address,
      city,
      zip_code: zipCode,
      province_state: provinceState,
      linkedin_url: linkedinUrl,
      twitter_url: twitterUrl,
      facebook_url: facebookUrl,
      instagram_url: instagramUrl,
      company_logo_url: companyLogoUrl,
      company_logo_small_url: companyLogoSmallUrl,
      company_icon_url: companyIconUrl,
    };

    try {
      await updateMutation.mutateAsync(data);
      toast.success("App settings updated successfully");
    } catch (error) {
      console.error("Failed to update settings:", error);
      toast.error("Failed to update settings");
    }
  };

  return (
    <DashboardLayout
      title="APP SETTINGS"
      breadcrumb={[
        { label: "Settings", path: "/settings/app" },
        { label: "App", path: "/settings/app" },
      ]}
    >
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                  id="name"
                  placeholder="Company Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">Province/State</Label>
                <Input
                  id="province"
                  placeholder="Province/State"
                  value={provinceState}
                  onChange={(e) => setProvinceState(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="about">About</Label>
                <Textarea
                  id="about"
                  placeholder="About the company"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  placeholder="LinkedIn URL"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input
                  id="twitter"
                  placeholder="Twitter URL"
                  value={twitterUrl}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input
                  id="facebook"
                  placeholder="Facebook URL"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  placeholder="Instagram URL"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Company Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoChange(e, 'logo')}
                  className="cursor-pointer"
                />
                {companyLogoUrl && (
                  <div className="mt-2">
                    <img
                      src={companyLogoUrl}
                      alt="Logo Preview"
                      className="h-20 w-auto object-contain border rounded p-2"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoSmall">Company Logo (Small)</Label>
                <Input
                  id="logoSmall"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoChange(e, 'small')}
                  className="cursor-pointer"
                />
                {companyLogoSmallUrl && (
                  <div className="mt-2">
                    <img
                      src={companyLogoSmallUrl}
                      alt="Small Logo Preview"
                      className="h-16 w-auto object-contain border rounded p-2"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Company Icon</Label>
                <Input
                  id="icon"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleLogoChange(e, 'icon')}
                  className="cursor-pointer"
                />
                {companyIconUrl && (
                  <div className="mt-2">
                    <img
                      src={companyIconUrl}
                      alt="Icon Preview"
                      className="h-12 w-12 object-contain border rounded p-1"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={updateMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {updateMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
