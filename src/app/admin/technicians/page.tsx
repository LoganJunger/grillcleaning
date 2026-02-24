"use client";

import { useEffect, useState, useCallback } from "react";

interface Technician {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_area: string;
  is_active: number;
  notes: string | null;
  created_at: string;
}

export default function TechniciansPage() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  // Kill ALL native browser validation
  const suppressValidation = useCallback((e: Event) => e.preventDefault(), []);
  useEffect(() => {
    document.addEventListener("invalid", suppressValidation, true);
    return () => document.removeEventListener("invalid", suppressValidation, true);
  }, [suppressValidation]);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    service_area: "Cincinnati",
    notes: "",
  });

  const fetchTechnicians = () => {
    fetch("/api/technicians")
      .then((res) => res.json())
      .then((data) => {
        setTechnicians(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const resetForm = () => {
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      service_area: "Cincinnati",
      notes: "",
    });
    setShowForm(false);
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const url = editingId ? `/api/technicians/${editingId}` : "/api/technicians";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save technician");
      }

      resetForm();
      fetchTechnicians();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (tech: Technician) => {
    setForm({
      first_name: tech.first_name,
      last_name: tech.last_name,
      email: tech.email,
      phone: tech.phone,
      service_area: tech.service_area,
      notes: tech.notes || "",
    });
    setEditingId(tech.id);
    setShowForm(true);
  };

  const toggleActive = async (tech: Technician) => {
    await fetch(`/api/technicians/${tech.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: tech.is_active ? 0 : 1 }),
    });
    fetchTechnicians();
  };

  const deleteTechnician = async (id: string) => {
    if (!confirm("Are you sure you want to delete this technician?")) return;

    const res = await fetch(`/api/technicians/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to delete technician");
      return;
    }
    fetchTechnicians();
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Technicians</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors"
        >
          + Add Technician
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? "Edit Technician" : "Add New Technician"}
          </h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="text"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Area
                </label>
                <input
                  type="text"
                  value={form.service_area}
                  onChange={(e) => setForm({ ...form, service_area: e.target.value })}
                  placeholder="e.g. Cincinnati, Mason, West Chester"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <input
                  type="text"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any notes about this technician"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {submitting
                  ? "Saving..."
                  : editingId
                  ? "Update Technician"
                  : "Add Technician"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Technicians List */}
      {technicians.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center text-gray-500">
          <p className="mb-2">No technicians added yet.</p>
          <p className="text-sm">
            Add technicians to assign them to bookings and expand your service area.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {technicians.map((tech) => (
            <div
              key={tech.id}
              className={`bg-white rounded-lg shadow-sm border p-5 ${
                !tech.is_active ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {tech.first_name} {tech.last_name}
                  </h3>
                  <p className="text-sm text-gray-500">{tech.email}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    tech.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {tech.is_active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p>Phone: {tech.phone}</p>
                <p>Area: {tech.service_area}</p>
                {tech.notes && <p>Notes: {tech.notes}</p>}
              </div>
              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => startEdit(tech)}
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  Edit
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => toggleActive(tech)}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  {tech.is_active ? "Deactivate" : "Activate"}
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => deleteTechnician(tech.id)}
                  className="text-red-500 hover:text-red-600 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
