import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartPulse, Home, Phone, Search } from "lucide-react";
import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full ">
        <div className="p-8 md:p-12 text-center ">
          {/* Medical Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <HeartPulse
                  className="w-12 h-12 text-primary"
                  strokeWidth={2}
                />
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">
                  !
                </span>
              </div>
            </div>
          </div>

          {/* Error Code */}
          <div className="mb-4">
            <h1 className="text-7xl md:text-8xl font-bold text-primary mb-2">
              404
            </h1>
            <div className="h-1 w-24 bg-accent mx-auto rounded-full" />
          </div>

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 text-balance">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-lg mb-8 text-pretty leading-relaxed max-w-md mx-auto">
            We couldn't locate the page you're looking for. It may have been
            moved, deleted, or the URL might be incorrect.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent"
            ></Button>
          </div>

          {/* Help Section */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Need immediate medical assistance?
            </p>
            <Button asChild variant="secondary" size="sm">
              <Link href="/contact">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us - +1 (555) 123-456
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
