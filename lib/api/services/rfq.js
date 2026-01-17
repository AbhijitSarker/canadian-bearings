/**
 * RFQ (Request for Quote) API Service
 * 
 * This file contains the API call to submit RFQ data to your C# backend.
 */

import { apiClient } from '../client';
import { endpoints } from '../endpoints';
import { formatAPIError } from '@/lib/utils/api-error';

/**
 * Submit RFQ to the server
 * @param {FormData} formData - The prepared FormData object containing form fields, line items, and files
 * @returns {Promise<Object>} Response from the server
 */
export async function submitRFQ(formData) {
  try {
    const res = await apiClient.postFormData(endpoints.rfq.submit, formData);
    if (res.success) return { success: true, data: res.data };
    return { success: false, error: 'Invalid response' };
  } catch (err) {
    return { success: false, error: formatAPIError(err) };
  }
}

/**
 * Example of how to use this in your RFQ page:
 * 
 * import { submitRFQ } from '@/lib/api/services/rfq';
 * 
 * const handleSubmit = async ({ form, lines, formData }) => {
 *   const result = await submitRFQ(formData);
 *   
 *   if (result.success) {
 *     toast.success('Quote request submitted successfully!');
 *     // Handle success (e.g., redirect, show confirmation)
 *   } else {
 *     toast.error(result.error);
 *   }
 * };
 */

/**
 * Expected C# Controller Structure:
 * 
 * [HttpPost("submit")]
 * public async Task<IActionResult> SubmitRFQ([FromForm] RFQSubmissionModel model)
 * {
 *     // Your C# backend should receive:
 *     // - model.FirstName
 *     // - model.LastName
 *     // - model.Email
 *     // - model.PhoneCountryCode
 *     // - model.PhoneNumber
 *     // - model.Comment
 *     // - model.Lines (List<RFQLineItem>)
 *     
 *     // Process the RFQ submission
 *     return Ok(new { message = "RFQ submitted successfully", id = rfqId });
 * }
 * 
 * public class RFQSubmissionModel
 * {
 *     public string FirstName { get; set; }
 *     public string LastName { get; set; }
 *     public string Email { get; set; }
 *     public string PhoneCountryCode { get; set; }
 *     public string PhoneNumber { get; set; }
 *     public string Comment { get; set; }
 *     public List<RFQLineItem> Lines { get; set; }
 * }
 * 
 * public class RFQLineItem
 * {
 *     public int Id { get; set; }
 *     public string Part { get; set; }
 *     public string Description { get; set; }
 *     public int Qty { get; set; }
 *     public List<IFormFile> Files { get; set; }
 * }
 */
