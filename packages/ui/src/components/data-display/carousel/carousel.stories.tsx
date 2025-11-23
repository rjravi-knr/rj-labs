import React from "react"
import { Meta, StoryObj } from "@storybook/react-vite"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./carousel"
import { Card, CardContent } from "../../molecules/card/card"

const meta: Meta = {
  title: "Data Display/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A flexible, accessible carousel component built with embla-carousel-react. Supports horizontal/vertical orientation, custom navigation, and full styling control.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Carousel>

export const Basic: Story = {
  render: () => (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <Carousel>
        <CarouselContent>
          {[1, 2, 3].map((n) => (
            <CarouselItem key={n}>
              <div
                style={{
                  height: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#f3f4f6",
                  borderRadius: 8,
                  fontSize: 32,
                  fontWeight: 600,
                }}
              >
                Slide {n}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  name: "Basic",
  parameters: {
    docs: {
      description: {
        story: "A simple horizontal carousel with three slides and navigation buttons.",
      },
    },
  },
}

export const Vertical: Story = {
  render: () => (
    <div style={{ height: 400, width: 320, margin: "0 auto", position: "relative" }}>
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  ),
  name: "Vertical",
  parameters: {
    docs: {
      description: {
        story: "A vertical carousel with three slides and navigation buttons, properly sized to avoid full-screen stacking.",
      },
    },
  },
}

export const Playground: Story = {
  args: {},
  render: (_args: any) => (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <Carousel>
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((n) => (
            <CarouselItem key={n}>
              <div
                style={{
                  height: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#e0e7ff",
                  borderRadius: 8,
                  fontSize: 32,
                  fontWeight: 600,
                }}
              >
                Slide {n}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  name: "Playground",
  parameters: {
    docs: {
      description: {
        story: "Interactive playground for the Carousel component.",
      },
    },
  },
}
