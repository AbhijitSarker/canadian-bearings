"use client";



export default function KnowledgeCenterTab() {

  return (
    <div className="bg-white rounded-lg sm:rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3 sm:mb-4">Knowledge Center</h2>

      <p className="text-gray-600 text-sm sm:text-base mb-6">Browse our knowledge base and resources.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Video Section */}
        {/* Video Section */}
        <div className="flex flex-col h-full">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Video Tutorials</h3>
          <div className="flex-grow flex flex-col">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col flex-grow h-full">
              <div className="relative flex-grow bg-gray-100 border-b border-gray-200 min-h-[300px]">
                <iframe 
                  src="https://www.youtube.com/embed/y9Pvle847Y8" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
              
              <div className="p-4 flex items-start bg-gray-50">
                <div className="flex-shrink-0 mr-4">
                  <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Platform Overview</h4>
                  <p className="text-xs text-gray-500 mt-1">Learn how to use our platform features effectively.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PDF Section */}
        <div className="flex flex-col h-full">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Documents</h3>
          <a 
            href="https://cbmro.com/catalog/documents/CB_COP_SupportCase.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block group flex-grow flex flex-col"
          >
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-green-500 hover:shadow-md transition-all flex flex-col flex-grow h-full">
              {/* PDF Preview */}
              <div className="relative flex-grow bg-gray-100 border-b border-gray-200 min-h-[300px] overflow-hidden">
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <iframe 
                    src="https://cbmro.com/catalog/documents/CB_COP_SupportCase.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH" 
                    className="w-full h-full pointer-events-none"
                    title="PDF Preview"
                    tabIndex="-1"
                    scrolling="no"
                    style={{ width: '105%', height: '105%' }}
                  ></iframe>
                </div>
                {/* Overlay to ensure clicks go to the link and not the iframe */}
                <div className="absolute inset-0 bg-transparent"></div>
              </div>
              
              <div className="p-4 flex items-start bg-gray-50 group-hover:bg-white transition-colors">
                <div className="flex-shrink-0 mr-4">
                  <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600">CB COP Support Case Guide</h4>
                  <p className="text-xs text-gray-500 mt-1">Download our comprehensive guide on handling support cases.</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

