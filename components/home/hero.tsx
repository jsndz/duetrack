"use client"

import { motion } from "framer-motion"
import { Bell, Calendar, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-50 via-white to-slate-50">
      {/* Subtle background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-sky-100 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500 text-white">
            <Bell className="w-5 h-5" />
          </div>
          <span className="text-xl font-semibold text-slate-800">DueTrack</span>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center mb-10"
        >
          <div className="relative">
            <div className="flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-sky-100 to-blue-100 shadow-lg shadow-sky-100">
              <Calendar className="w-16 h-16 text-sky-500" />
            </div>
            {/* Floating notification badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
              className="absolute -top-2 -right-2 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-400 text-white shadow-lg shadow-emerald-200"
            >
              <CheckCircle2 className="w-5 h-5" />
            </motion.div>
            {/* Floating bell */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
              className="absolute -bottom-3 -left-6 flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-lg shadow-slate-200 border border-slate-100"
            >
              <Bell className="w-6 h-6 text-sky-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6 text-balance"
        >
          Never Forget a Bill Again
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 text-pretty leading-relaxed"
        >
          Stay on top of every payment with smart reminders. DueTrack keeps your bills organized and sends timely alerts
          so you never miss a due date.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
        >
          <Button
            size="lg"
            className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 text-lg font-medium rounded-xl shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 transition-all duration-300"
          >
            Start Tracking
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-6 mt-12 text-sm text-slate-400"
        >
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Free to start
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            No credit card
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Cancel anytime
          </span>
        </motion.div>
      </div>
    </section>
  )
}
