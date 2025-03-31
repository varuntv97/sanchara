"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Loader2, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggeredChildren } from "@/components/animations/staggered-children"
import { ButtonAnimation } from "@/components/animations/button-animation"
import { AnimatedCounter } from "@/components/animations/animated-counter"

interface PackingItem {
  id: string
  name: string
  category: string
  quantity: number
  is_packed: boolean
  is_essential: boolean
  notes: string | null
}

interface PackingListProps {
  itineraryId: string
}

export function PackingList({ itineraryId }: PackingListProps) {
  const [packingList, setPackingList] = useState<PackingItem[] | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | "all">("all")
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: 1,
    is_essential: false,
    notes: "",
  })
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [customCategory, setCustomCategory] = useState("")
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [progress, setProgress] = useState(0)

  // Fetch packing list
  useEffect(() => {
    const fetchPackingList = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/itineraries/${itineraryId}/packing-list`)
        const data = await response.json()

        if (data.packingList) {
          setPackingList(data.packingList.items)

          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(data.packingList.items.map((item: PackingItem) => item.category)),
          ).sort()
          setCategories(uniqueCategories)
        } else {
          setPackingList(null)
        }
      } catch (error) {
        console.error("Error fetching packing list:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPackingList()
  }, [itineraryId])

  // Calculate progress
  useEffect(() => {
    if (packingList && packingList.length > 0) {
      const packedItems = packingList.filter((item) => item.is_packed).length
      const newProgress = Math.round((packedItems / packingList.length) * 100)

      // Animate progress change
      const timer = setTimeout(() => {
        setProgress(newProgress)
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [packingList])

  // Generate packing list
  const handleGeneratePackingList = async () => {
    try {
      setIsGenerating(true)
      const response = await fetch(`/api/itineraries/${itineraryId}/packing-list`, {
        method: "POST",
      })
      const data = await response.json()

      if (data.packingList) {
        setPackingList(data.packingList.items)

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.packingList.items.map((item: PackingItem) => item.category)),
        ).sort()
        setCategories(uniqueCategories)
      }
    } catch (error) {
      console.error("Error generating packing list:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Toggle item packed status
  const toggleItemPacked = async (itemId: string, isPacked: boolean) => {
    try {
      // Optimistically update UI
      setPackingList(
        (prevList) => prevList?.map((item) => (item.id === itemId ? { ...item, is_packed: !isPacked } : item)) || null,
      )

      // Update in database
      await fetch(`/api/itineraries/${itineraryId}/packing-list/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_packed: !isPacked }),
      })
    } catch (error) {
      console.error("Error updating item:", error)

      // Revert optimistic update on error
      setPackingList(
        (prevList) => prevList?.map((item) => (item.id === itemId ? { ...item, is_packed: isPacked } : item)) || null,
      )
    }
  }

  // Add new item
  const handleAddItem = async () => {
    try {
      setIsAddingItem(true)

      // Use custom category if provided
      const category = showAddCategory ? customCategory : newItem.category

      if (!newItem.name || !category) {
        return
      }

      const response = await fetch(`/api/itineraries/${itineraryId}/packing-list/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newItem,
          category,
        }),
      })

      const data = await response.json()

      if (data.item) {
        // Add new item to the list
        setPackingList((prevList) => [...(prevList || []), data.item])

        // Add new category if it doesn't exist
        if (!categories.includes(category)) {
          setCategories([...categories, category].sort())
        }

        // Reset form
        setNewItem({
          name: "",
          category: "",
          quantity: 1,
          is_essential: false,
          notes: "",
        })
        setCustomCategory("")
        setShowAddCategory(false)
      }
    } catch (error) {
      console.error("Error adding item:", error)
    } finally {
      setIsAddingItem(false)
    }
  }

  // Delete item
  const handleDeleteItem = async (itemId: string) => {
    try {
      // Optimistically update UI
      setPackingList((prevList) => prevList?.filter((item) => item.id !== itemId) || null)

      // Delete from database
      await fetch(`/api/itineraries/${itineraryId}/packing-list/items/${itemId}`, {
        method: "DELETE",
      })

      // Update categories if needed
      if (packingList) {
        const remainingItems = packingList.filter((item) => item.id !== itemId)
        const uniqueCategories = Array.from(new Set(remainingItems.map((item) => item.category))).sort()
        setCategories(uniqueCategories)
      }
    } catch (error) {
      console.error("Error deleting item:", error)
      // Refetch the list on error to restore state
      const response = await fetch(`/api/itineraries/${itineraryId}/packing-list`)
      const data = await response.json()
      if (data.packingList) {
        setPackingList(data.packingList.items)
      }
    }
  }

  // Filter items by category
  const filteredItems = packingList
    ? activeCategory === "all"
      ? packingList
      : packingList.filter((item) => item.category === activeCategory)
    : []

  // Count items by category
  const getCategoryCount = (category: string) => {
    return packingList?.filter((item) => item.category === category).length || 0
  }

  // Count packed items by category
  const getPackedCategoryCount = (category: string) => {
    return packingList?.filter((item) => item.category === category && item.is_packed).length || 0
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Packing List</CardTitle>
          <CardDescription>Loading your packing list...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  if (!packingList) {
    return (
      <FadeIn>
        <Card>
          <CardHeader>
            <CardTitle>Packing List</CardTitle>
            <CardDescription>Generate a personalized packing list for your trip</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <p className="mb-4 text-muted-foreground">
              No packing list found. Generate one based on your trip details.
            </p>
            <ButtonAnimation>
              <Button onClick={handleGeneratePackingList} disabled={isGenerating} className="group">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4 transition-all duration-300 group-hover:rotate-90" /> Generate Packing
                    List
                  </>
                )}
              </Button>
            </ButtonAnimation>
          </CardContent>
        </Card>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle>Packing List</CardTitle>
              <CardDescription>Keep track of what to pack for your trip</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "6rem" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-2 w-24 overflow-hidden rounded-full bg-muted"
              >
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 bg-primary"
                />
              </motion.div>
              <span className="text-sm text-muted-foreground">
                <AnimatedCounter value={packingList.filter((item) => item.is_packed).length} duration={800} />/
                {packingList.length} packed
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveCategory(value)}>
            <div className="overflow-x-auto pb-2 -mx-1">
              <TabsList className="mb-4 flex-nowrap px-1">
                <TabsTrigger value="all" className="whitespace-nowrap">
                  All ({packingList.filter((item) => item.is_packed).length}/{packingList.length})
                </TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="whitespace-nowrap">
                    {category} ({getPackedCategoryCount(category)}/{getCategoryCount(category)})
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="space-y-4">
                {categories.map((category, categoryIndex) => (
                  <FadeIn key={category} delay={0.1 * categoryIndex}>
                    <div>
                      <h3 className="font-medium mb-2">{category}</h3>
                      <StaggeredChildren className="space-y-2">
                        {packingList
                          .filter((item) => item.category === category)
                          .map((item) => (
                            <motion.div
                              key={item.id}
                              className="flex items-center justify-between rounded-lg border p-3 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                              whileHover={{ scale: 1.01 }}
                              layout
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <Checkbox
                                  checked={item.is_packed}
                                  onCheckedChange={() => toggleItemPacked(item.id, item.is_packed)}
                                  id={`item-${item.id}`}
                                  className="transition-all duration-300 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                />
                                <div
                                  className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${item.is_packed ? "text-muted-foreground line-through" : ""}`}
                                >
                                  <Label htmlFor={`item-${item.id}`} className="cursor-pointer font-medium truncate">
                                    {item.name} {item.quantity > 1 && `(${item.quantity})`}
                                  </Label>
                                  {item.notes && (
                                    <span className="text-xs text-muted-foreground truncate">{item.notes}</span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                                {item.is_essential && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs transition-all duration-300 hover:bg-primary/10"
                                  >
                                    Essential
                                  </Badge>
                                )}
                                <ButtonAnimation>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors duration-300"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </ButtonAnimation>
                              </div>
                            </motion.div>
                          ))}
                      </StaggeredChildren>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <StaggeredChildren className="space-y-2">
                  {packingList
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <motion.div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg border p-3 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-md"
                        whileHover={{ scale: 1.01 }}
                        layout
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Checkbox
                            checked={item.is_packed}
                            onCheckedChange={() => toggleItemPacked(item.id, item.is_packed)}
                            id={`item-${item.id}`}
                            className="transition-all duration-300 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                          />
                          <div
                            className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${item.is_packed ? "text-muted-foreground line-through" : ""}`}
                          >
                            <Label htmlFor={`item-${item.id}`} className="cursor-pointer font-medium truncate">
                              {item.name} {item.quantity > 1 && `(${item.quantity})`}
                            </Label>
                            {item.notes && <span className="text-xs text-muted-foreground truncate">{item.notes}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                          {item.is_essential && (
                            <Badge
                              variant="outline"
                              className="text-xs transition-all duration-300 hover:bg-primary/10"
                            >
                              Essential
                            </Badge>
                          )}
                          <ButtonAnimation>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteItem(item.id)}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors duration-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </ButtonAnimation>
                        </div>
                      </motion.div>
                    ))}
                </StaggeredChildren>
              </TabsContent>
            ))}
          </Tabs>

          <Dialog>
            <DialogTrigger asChild>
              <ButtonAnimation className="w-full mt-6">
                <Button className="w-full group">
                  <Plus className="mr-2 h-4 w-4 transition-all duration-300 group-hover:rotate-90" /> Add Item
                </Button>
              </ButtonAnimation>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Packing Item</DialogTitle>
                <DialogDescription>Add a new item to your packing list.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    id="item-name"
                    placeholder="e.g., Toothbrush"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-category">Category</Label>
                  {showAddCategory ? (
                    <div className="flex gap-2">
                      <Input
                        id="custom-category"
                        placeholder="New category name"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                      />
                      <ButtonAnimation>
                        <Button variant="outline" size="sm" onClick={() => setShowAddCategory(false)}>
                          Cancel
                        </Button>
                      </ButtonAnimation>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Select
                        value={newItem.category}
                        onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                      >
                        <SelectTrigger
                          id="item-category"
                          className="w-full transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                        >
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <ButtonAnimation>
                        <Button variant="outline" size="sm" onClick={() => setShowAddCategory(true)}>
                          New
                        </Button>
                      </ButtonAnimation>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="item-quantity">Quantity</Label>
                    <Input
                      id="item-quantity"
                      type="number"
                      min="1"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) || 1 })}
                      className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="item-essential"
                        checked={newItem.is_essential}
                        onCheckedChange={(checked) => setNewItem({ ...newItem, is_essential: checked === true })}
                        className="transition-all duration-300 data-[state=checked]:bg-primary"
                      />
                      <Label htmlFor="item-essential">Mark as essential</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-notes">Notes (Optional)</Label>
                  <Input
                    id="item-notes"
                    placeholder="Any special notes about this item"
                    value={newItem.notes}
                    onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <DialogFooter>
                <ButtonAnimation>
                  <Button
                    onClick={handleAddItem}
                    disabled={isAddingItem || !newItem.name || (!newItem.category && !customCategory)}
                    className="group"
                  >
                    {isAddingItem ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4 transition-all duration-300 group-hover:rotate-90" /> Add Item
                      </>
                    )}
                  </Button>
                </ButtonAnimation>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </FadeIn>
  )
}

