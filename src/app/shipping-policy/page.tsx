import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Package, IndianRupee, Map } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Shipping Policy</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about how we get your favorite Karavali products to you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-6 w-6 text-accent" />
                Order Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>All orders are processed within 1-2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="h-6 w-6 text-accent" />
                Shipping Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p className="font-semibold text-foreground">We offer FREE shipping for all orders with a subtotal of ₹799 or more.</p>
              <p>For orders below ₹799, a flat-rate shipping fee of ₹50 will be applied for deliveries within Karnataka, and ₹80 for all other states within India.</p>
              <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-6 w-6 text-accent" />
                Estimated Delivery Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>We partner with reliable courier services to ensure your order reaches you safely and on time.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-semibold">Within Karnataka:</span> 3-5 business days.</li>
                <li><span className="font-semibold">Metro Cities (outside Karnataka):</span> 5-7 business days.</li>
                <li><span className="font-semibold">Rest of India:</span> 7-10 business days.</li>
              </ul>
              <p>Please note that these are estimated delivery times and can vary due to factors beyond our control, such as weather conditions or logistical issues with the courier partner.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-6 w-6 text-accent" />
                Shipment Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
              <p>If you haven’t received your order within 10 days of receiving your shipping confirmation email, please contact us at support@tulunadustore.com with your name and order number, and we will look into it for you.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
